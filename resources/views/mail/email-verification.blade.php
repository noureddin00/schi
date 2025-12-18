<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="rtl">

<head>
   <title>{{ config('app.name') }}</title>
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
   <meta name="color-scheme" content="light">
   <meta name="supported-color-schemes" content="light">
   <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Cairo:wght@300;400;600;700&display=swap" rel="stylesheet">
   <style>
      @media only screen and (max-width: 600px) {
         .inner-body {
            width: 100% !important;
         }
         .footer {
            width: 100% !important;
         }
      }
      @media only screen and (max-width: 500px) {
         .button {
            width: 100% !important;
         }
      }
      body, h1, p, a {
         font-family: 'Cairo', 'Almarai', Arial, sans-serif;
      }
   </style>
   {{ $head ?? '' }}
</head>

<body style="direction: rtl; text-align: right;">
   <h1 style="font-size: 1.5em; font-weight: 600; margin-bottom: 1em; font-family: 'Cairo', 'Almarai', Arial, sans-serif;">
      مرحبًا، {{ $user->name }}!
   </h1>
   <p style="margin-bottom: 1.5em; font-family: 'Cairo', 'Almarai', Arial, sans-serif;">
      شكرًا لتسجيلك معنا. يرجى تأكيد بريدك الإلكتروني بالنقر على الزر أدناه:
   </p>
   <a
      href="{{ $url }}"
      style="display: inline-block; padding: 0.75em 1.5em; background-color: #0969da; color: #fff; border-radius: 0.5em; text-decoration: none; font-weight: 600; margin-bottom: 1.5em; font-family: 'Cairo', 'Almarai', Arial, sans-serif;"
   >
      تفعيل البريد الإلكتروني
   </a>
   <p style="margin-bottom: 1em; font-family: 'Cairo', 'Almarai', Arial, sans-serif;">
      سينتهي رابط التفعيل خلال 5 دقائق.
   </p>
   <p style="margin-bottom: 1em; font-family: 'Cairo', 'Almarai', Arial, sans-serif;">
      إذا لم تقم بإنشاء حساب، فلا حاجة لأي إجراء آخر.
   </p>

   <p style="margin: 2em 0 0; font-family: 'Cairo', 'Almarai', Arial, sans-serif;">
      شكرًا،<br>
      {{ config('mail.from.name') }}
   </p>
</body>

</html>
