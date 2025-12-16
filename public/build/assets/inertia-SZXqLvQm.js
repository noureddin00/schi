const f=(c,o,l)=>{const n=c.target;if(n.type==="file"){const a=n.files;a&&a[0]&&(o(n.name,a[0]),l==null||l(URL.createObjectURL(a[0])))}else o(n.name,n.value)};export{f as o};
