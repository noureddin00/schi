<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\App;

class InstructorApprovalNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(private array $data) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        if ($notifiable->role !== 'admin') {
            return ['mail', 'database'];
        }

        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        App::setLocale('ar');

        return (new MailMessage)
            ->subject('تحديث حالة طلب المحاضر')
            ->view('mail.instructor-approval', [
                'user' => $notifiable,
                'status' => $this->data['status'],
                'feedback' => $this->data['feedback'],
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $status = $this->data['status'] ?? 'pending';
        $statusLabel = [
            'approved' => 'تمت الموافقة',
            'pending' => 'قيد المراجعة',
            'rejected' => 'مرفوض',
        ][$status] ?? $status;

        if ($notifiable->role === 'admin') {
            return [
                'title' => 'طلب محاضر جديد',
                'body' => 'يوجد طلب محاضر جديد قيد المراجعة.',
                'url' => route('instructors.applications'),
            ];
        }

        $url = $status === 'approved'
            ? route('dashboard')
            : route('student.index', ['tab' => 'instructor']);

        $feedback = $this->data['feedback'] ?? '';
        $body = $feedback ?: ($status === 'pending'
            ? 'تم إرسال طلبك للمراجعة من قبل الإدارة.'
            : 'تم تحديث حالة طلبك إلى: ' . $statusLabel);

        return [
            'title' => 'حالة طلب المحاضر: ' . $statusLabel,
            'body' => $body,
            'url' => $url,
        ];
    }
}
