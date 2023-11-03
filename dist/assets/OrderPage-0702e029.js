import{D as W,E as X,d as A,G as Z,p as S,f as D,g as b,H as ee,o as v,a as p,b as e,I as h,J as E,v as I,u as U,t as m,e as T,F as B,r as te,q as oe,A as re,x as j,y as Q,K as O,L as k,N as R,O as ae,_ as q,h as z,z as se,R as ne,j as V,P as ie}from"./index-6dbffac2.js";var J={exports:{}};(function(c,o){(function(n,a){c.exports=a()})(X,function(){var n="__v-click-outside",a=typeof window<"u",f=typeof navigator<"u",w=a&&("ontouchstart"in window||f&&navigator.msMaxTouchPoints>0)?["touchstart"]:["click"],M=function(s){var l=s.event,t=s.handler;(0,s.middleware)(l)&&t(l)},C=function(s,l){var t=function(d){var u=typeof d=="function";if(!u&&typeof d!="object")throw new Error("v-click-outside: Binding value must be a function or an object");return{handler:u?d:d.handler,middleware:d.middleware||function(_){return _},events:d.events||w,isActive:d.isActive!==!1,detectIframe:d.detectIframe!==!1,capture:!!d.capture}}(l.value),r=t.handler,N=t.middleware,K=t.detectIframe,P=t.capture;if(t.isActive){if(s[n]=t.events.map(function(d){return{event:d,srcTarget:document.documentElement,handler:function(u){return function(_){var $=_.el,y=_.event,F=_.handler,x=_.middleware,L=y.path||y.composedPath&&y.composedPath();(L?L.indexOf($)<0:!$.contains(y.target))&&M({event:y,handler:F,middleware:x})}({el:s,event:u,handler:r,middleware:N})},capture:P}}),K){var Y={event:"blur",srcTarget:window,handler:function(d){return function(u){var _=u.el,$=u.event,y=u.handler,F=u.middleware;setTimeout(function(){var x=document.activeElement;x&&x.tagName==="IFRAME"&&!_.contains(x)&&M({event:$,handler:y,middleware:F})},0)}({el:s,event:d,handler:r,middleware:N})},capture:P};s[n]=[].concat(s[n],[Y])}s[n].forEach(function(d){var u=d.event,_=d.srcTarget,$=d.handler;return setTimeout(function(){s[n]&&_.addEventListener(u,$,P)},0)})}},g=function(s){(s[n]||[]).forEach(function(l){return l.srcTarget.removeEventListener(l.event,l.handler,l.capture)}),delete s[n]},i=a?{beforeMount:C,updated:function(s,l){var t=l.value,r=l.oldValue;JSON.stringify(t)!==JSON.stringify(r)&&(g(s),C(s,{value:t}))},unmounted:g}:{};return{install:function(s){s.directive("click-outside",i)},directive:i}})})(J);var le=J.exports;const de=W(le),G=c=>(j("data-v-437d294d"),c=c(),Q(),c),ce={class:"order__required-part"},ue={class:"order__left-part"},_e=["placeholder"],ve=["placeholder"],pe={class:"order__country-data"},me={key:0},he={key:1,class:"order__country-placeholder_active"},fe={key:2,style:{color:"#d20000"}},we=G(()=>e("span",{class:"order__arrow-down"},"▾",-1)),ge=["onClick"],ye={class:"order__right-part"},Ee=["placeholder"],$e=["placeholder"],Ie=["placeholder"],Oe=G(()=>e("button",{type:"submit",class:"order__btn"}," Reserve Now ",-1)),ke=A({__name:"OrderForm",setup(c){const o=Z({first_name:"",last_name:"",info_1:"",info_2:"",country:"",email:"",phone:"",comment:""}),n=S(!1),a=S(""),f=l=>{a.value=l,o.country=l,n.value=!1},w=D(),M=b(()=>w.getters.location),C=b(()=>({first_name:{required:O.withMessage(k.REQUIRED_FIRSTNAME,R)},last_name:{required:O.withMessage(k.REQUIRED_LASTNAME,R)},info_1:{required:O.withMessage(k.REQUIRED_INFO1,R)},info_2:{required:O.withMessage(k.REQUIRED_INFO2,R)},country:{required:O.withMessage(k.REQUIRED_COUNTRY,R)},email:{required:O.withMessage(k.REQUIRED_EMAIL,R)}})),g=ee(C,o),i=b(()=>ae(g.value.$errors)),s=async()=>{await g.value.$validate()&&await w.dispatch(re.BOOK_HOTEL,o)};return(l,t)=>(v(),p("form",{class:"order",onSubmit:[t[8]||(t[8]=oe(()=>{},["prevent"])),s]},[e("div",ce,[e("div",ue,[h(e("input",{"onUpdate:modelValue":t[0]||(t[0]=r=>o.first_name=r),class:I({order__error:U(g).first_name.$error}),placeholder:i.value.first_name?i.value.first_name:"First Name *"},null,10,_e),[[E,o.first_name,void 0,{trim:!0}]]),h(e("input",{"onUpdate:modelValue":t[1]||(t[1]=r=>o.info_1=r),class:I({order__error:U(g).info_1.$error}),placeholder:i.value.info_1?i.value.info_1:"Info-1 *"},null,10,ve),[[E,o.info_1,void 0,{trim:!0}]]),e("div",pe,[e("div",{class:"order__country-placeholder",onClick:t[2]||(t[2]=()=>{n.value=!0})},[!o.country.length&&!i.value.country?(v(),p("p",me," Country * ")):(v(),p("p",he,m(o.country),1)),i.value.country?(v(),p("p",fe,m(i.value.country),1)):T("",!0),we]),n.value?h((v(),p("div",{key:0,class:I({"search__location-list":n.value})},[e("ul",null,[(v(!0),p(B,null,te(M.value,r=>(v(),p("li",{key:r,onClick:N=>f(r)},[e("span",null,m(r),1)],8,ge))),128))])],2)),[[U(de),()=>{n.value=!1}]]):T("",!0)])]),e("div",ye,[h(e("input",{"onUpdate:modelValue":t[3]||(t[3]=r=>o.last_name=r),class:I({order__error:i.value.last_name}),placeholder:i.value.last_name?i.value.last_name:"Last Name *"},null,10,Ee),[[E,o.last_name,void 0,{trim:!0}]]),h(e("input",{"onUpdate:modelValue":t[4]||(t[4]=r=>o.info_2=r),class:I({order__error:i.value.info_2}),placeholder:i.value.info_2?i.value.info_2:"Info-2 *"},null,10,$e),[[E,o.info_2,void 0,{trim:!0}]]),h(e("input",{"onUpdate:modelValue":t[5]||(t[5]=r=>o.email=r),class:I({order__error:i.value.email}),placeholder:i.value.email?i.value.email:"Email address *"},null,10,Ie),[[E,o.email,void 0,{trim:!0}]])])]),h(e("input",{"onUpdate:modelValue":t[6]||(t[6]=r=>o.phone=r),placeholder:"Phone"},null,512),[[E,o.phone,void 0,{trim:!0}]]),h(e("input",{"onUpdate:modelValue":t[7]||(t[7]=r=>o.comment=r),placeholder:"Comment"},null,512),[[E,o.comment,void 0,{trim:!0}]]),Oe],32))}});const Re=q(ke,[["__scopeId","data-v-437d294d"]]),H=c=>(j("data-v-89cea6c8"),c=c(),Q(),c),xe={class:"preview"},be={class:"preview__head"},Me=["src"],Ce={class:"preview__data"},Ne={class:"preview__hotel-name"},Pe=["href"],Fe=H(()=>e("div",{class:"preview__line"},null,-1)),Ue={class:"preview__hotel-rooms"},Ve={class:"preview__bottom"},Se=H(()=>e("h3",{class:"preview__price-title"}," Price Detail ",-1)),Te={class:"preview__price-details"},Ae={class:"preview__price"},De={class:"preview__price"},qe={class:"preview__price"},Le=A({__name:"OrderPreviewCard",setup(c){const o=S(0),n=D(),a=b(()=>n.getters.hotelInfo);return z(()=>{const f=+a.value.price[0].split("$")[1],w=+a.value.price[1].split("$")[1];o.value=+((f+w)/2).toFixed()}),(f,w)=>(v(),p("div",xe,[e("div",be,[e("img",{class:"preview__img",src:a.value.images[0],alt:"hotel image"},null,8,Me),e("div",Ce,[e("h3",Ne,m(a.value.name),1),e("a",{class:"preview__hotel-address",href:`https://yandex.ru/maps/?ll=${a.value.coords[0]},
                    ${a.value.coords[1]}&z=14&pt=${a.value.coords[0]},${a.value.coords[1]}`,target:"_blank`"},m(a.value.address),9,Pe),Fe,e("p",Ue,[e("span",null,m(a.value.info[0].bedroom)+" Bedroom ",1),e("span",null,m(a.value.info[0].bathroom)+" Bathroom ",1)])])]),e("div",Ve,[Se,e("div",Te,[e("p",Ae," Short Period: "+m(a.value.price[0]),1),e("p",De," Medium Period: $"+m(o.value),1),e("p",qe," Long Period: "+m(a.value.price[1]),1)])])]))}});const Be=q(Le,[["__scopeId","data-v-89cea6c8"]]),je={key:0,class:"order-page container"},Qe=A({__name:"OrderPage",setup(c){const o=D(),n=b(()=>o.getters.hotelInfo);return z(()=>{Object.keys(n.value).length||se.push(ne.home)}),(a,f)=>(v(),p(B,null,[Object.keys(n.value).length?(v(),p("div",je,[V(Re),V(Be)])):T("",!0),V(ie)],64))}});const Je=q(Qe,[["__scopeId","data-v-0defe5c7"]]);export{Je as default};
