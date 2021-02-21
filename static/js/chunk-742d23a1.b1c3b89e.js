(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-742d23a1"],{"6a7c":function(e,r,t){e.exports=t.p+"static/media/bg_batch.0ac1f715.mp4"},"73cf":function(e,r,t){"use strict";t.r(r);var s=function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",{staticClass:"login-register flex flex-center flex-items-center"},[s("video",{ref:"videoRef",staticClass:"video",attrs:{autoplay:"",preload:"preload",loop:"",muted:""},domProps:{muted:!0}},[s("source",{attrs:{src:t("6a7c"),type:"video/mp4"}})]),s("div",{staticClass:"form-container"},[s("router-link",{attrs:{to:"/Home"}},[s("div",{staticClass:"logo",style:{"background-image":"url("+e.logoUrl+")"}})]),s("div",{staticClass:"title"},[e._v(e._s(e.$t("register.userRegister")))]),s("div",{staticClass:"form"},[s("ValidationObserver",{staticClass:"form-box",attrs:{tag:"div"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.handleSubmit;return[s("ValidationProvider",{attrs:{rules:"required|account",tag:"label"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.errors;return[s("div",{staticClass:"form-row"},[s("div",{staticClass:"icon member"}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.registerForm.Account,expression:"registerForm.Account"}],attrs:{type:"text",placeholder:e.$t("register.enterAccountTip"),maxlength:"20"},domProps:{value:e.registerForm.Account},on:{input:function(r){r.target.composing||e.$set(e.registerForm,"Account",r.target.value)}}}),t[0]?s("div",{staticClass:"error-msg"},[s("div",[e._v(e._s(t[0]))])]):e._e()])]}}],null,!0)}),s("ValidationProvider",{attrs:{name:"password",rules:"required|password",tag:"label"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.errors;return[s("div",{staticClass:"form-row"},[s("div",{staticClass:"icon locker"}),"checkbox"===e.eye1?s("input",{directives:[{name:"model",rawName:"v-model",value:e.registerForm.Password,expression:"registerForm.Password"}],attrs:{placeholder:e.$t("register.enterPasswordTip1"),maxlength:"20",type:"checkbox"},domProps:{checked:Array.isArray(e.registerForm.Password)?e._i(e.registerForm.Password,null)>-1:e.registerForm.Password},on:{change:function(r){var t=e.registerForm.Password,s=r.target,o=!!s.checked;if(Array.isArray(t)){var i=null,a=e._i(t,i);s.checked?a<0&&e.$set(e.registerForm,"Password",t.concat([i])):a>-1&&e.$set(e.registerForm,"Password",t.slice(0,a).concat(t.slice(a+1)))}else e.$set(e.registerForm,"Password",o)}}}):"radio"===e.eye1?s("input",{directives:[{name:"model",rawName:"v-model",value:e.registerForm.Password,expression:"registerForm.Password"}],attrs:{placeholder:e.$t("register.enterPasswordTip1"),maxlength:"20",type:"radio"},domProps:{checked:e._q(e.registerForm.Password,null)},on:{change:function(r){return e.$set(e.registerForm,"Password",null)}}}):s("input",{directives:[{name:"model",rawName:"v-model",value:e.registerForm.Password,expression:"registerForm.Password"}],attrs:{placeholder:e.$t("register.enterPasswordTip1"),maxlength:"20",type:e.eye1},domProps:{value:e.registerForm.Password},on:{input:function(r){r.target.composing||e.$set(e.registerForm,"Password",r.target.value)}}}),s("div",{staticClass:"icon-eye",class:{open:"text"===e.eye1},on:{click:function(r){e.eye1="password"===e.eye1?"text":"password"}}}),t[0]?s("div",{staticClass:"error-msg"},[s("div",[e._v(e._s(t[0]))])]):e._e()])]}}],null,!0)}),s("ValidationProvider",{attrs:{rules:"required|pwdConfirm:@password",tag:"label"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.errors;return[s("div",{staticClass:"form-row"},[s("div",{staticClass:"icon locker"}),"checkbox"===e.eye2?s("input",{directives:[{name:"model",rawName:"v-model",value:e.registerForm.PasswordConfirm,expression:"registerForm.PasswordConfirm"}],attrs:{placeholder:e.$t("register.enterPasswordTip2"),maxlength:"20",type:"checkbox"},domProps:{checked:Array.isArray(e.registerForm.PasswordConfirm)?e._i(e.registerForm.PasswordConfirm,null)>-1:e.registerForm.PasswordConfirm},on:{change:function(r){var t=e.registerForm.PasswordConfirm,s=r.target,o=!!s.checked;if(Array.isArray(t)){var i=null,a=e._i(t,i);s.checked?a<0&&e.$set(e.registerForm,"PasswordConfirm",t.concat([i])):a>-1&&e.$set(e.registerForm,"PasswordConfirm",t.slice(0,a).concat(t.slice(a+1)))}else e.$set(e.registerForm,"PasswordConfirm",o)}}}):"radio"===e.eye2?s("input",{directives:[{name:"model",rawName:"v-model",value:e.registerForm.PasswordConfirm,expression:"registerForm.PasswordConfirm"}],attrs:{placeholder:e.$t("register.enterPasswordTip2"),maxlength:"20",type:"radio"},domProps:{checked:e._q(e.registerForm.PasswordConfirm,null)},on:{change:function(r){return e.$set(e.registerForm,"PasswordConfirm",null)}}}):s("input",{directives:[{name:"model",rawName:"v-model",value:e.registerForm.PasswordConfirm,expression:"registerForm.PasswordConfirm"}],attrs:{placeholder:e.$t("register.enterPasswordTip2"),maxlength:"20",type:e.eye2},domProps:{value:e.registerForm.PasswordConfirm},on:{input:function(r){r.target.composing||e.$set(e.registerForm,"PasswordConfirm",r.target.value)}}}),s("div",{staticClass:"icon-eye",class:{open:"text"===e.eye2},on:{click:function(r){e.eye2="password"===e.eye2?"text":"password"}}}),t[0]?s("div",{staticClass:"error-msg"},[s("div",[e._v(e._s(t[0]))])]):e._e()])]}}],null,!0)}),s("ValidationProvider",{attrs:{rules:"agent",tag:"label"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.errors;return[s("div",{staticClass:"form-row"},[s("div",{staticClass:"icon member"}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.registerForm.AgentCode,expression:"registerForm.AgentCode"}],attrs:{type:"text",placeholder:e.$t("register.agentCode"),disabled:e.agentCodeDis},domProps:{value:e.registerForm.AgentCode},on:{input:function(r){r.target.composing||e.$set(e.registerForm,"AgentCode",r.target.value)}}}),t[0]?s("div",{staticClass:"error-msg"},[s("div",[e._v(e._s(t[0]))])]):e._e()])]}}],null,!0)}),s("ValidationProvider",{attrs:{rules:{required:{allowFalse:!1}},tag:"label"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.errors;return[s("div",{staticClass:"form-row confirm1 flex flex-between flex-items-center",staticStyle:{height:"60px"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.confirm1,expression:"confirm1"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.confirm1)?e._i(e.confirm1,null)>-1:e.confirm1},on:{change:function(r){var t=e.confirm1,s=r.target,o=!!s.checked;if(Array.isArray(t)){var i=null,a=e._i(t,i);s.checked?a<0&&(e.confirm1=t.concat([i])):a>-1&&(e.confirm1=t.slice(0,a).concat(t.slice(a+1)))}else e.confirm1=o}}}),s("div",{staticClass:"confirm-text"},[e._v(e._s(e.$t("register.ruleConfirm1")))]),t[0]?s("div",{staticClass:"error-msg"},[s("div",[e._v(e._s(t[0]))])]):e._e()])]}}],null,!0)}),s("ValidationProvider",{attrs:{rules:{required:{allowFalse:!1}},tag:"label"},scopedSlots:e._u([{key:"default",fn:function(r){var t=r.errors;return[s("div",{staticClass:"form-row confirm1 flex flex-between flex-items-center"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.confirm2,expression:"confirm2"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.confirm2)?e._i(e.confirm2,null)>-1:e.confirm2},on:{change:function(r){var t=e.confirm2,s=r.target,o=!!s.checked;if(Array.isArray(t)){var i=null,a=e._i(t,i);s.checked?a<0&&(e.confirm2=t.concat([i])):a>-1&&(e.confirm2=t.slice(0,a).concat(t.slice(a+1)))}else e.confirm2=o}}}),s("div",{staticClass:"confirm-text"},[e._v(e._s(e.$t("register.ruleConfirm2")))]),t[0]?s("div",{staticClass:"error-msg"},[s("div",[e._v(e._s(t[0]))])]):e._e()])]}}],null,!0)}),s("div",{staticClass:"form-row"},[s("div",{staticClass:"btn",class:{active:e.registerForm.Account&&e.registerForm.Password&&e.registerForm.PasswordConfirm&&e.confirm1},on:{click:function(r){return t(e.registerNewMember)}}},[e._v(e._s(e.$t("register.register")))])]),s("div",{staticClass:"form-row flex flex-between flex-items-center"},[s("span",{staticClass:"have-tip"},[e._v(" "+e._s(e.$t("register.haveAccount"))+" "),s("router-link",{attrs:{to:"/Login"}},[s("a",{staticStyle:{color:"rgb(17, 142, 227)"}},[e._v(e._s(e.$t("register.login")))])])],1)])]}}])})],1)],1)])},o=[],i=(t("ac1f"),t("1276"),t("2fa1")),a=t("2f62"),n={name:"RegisterModal",data:function(){return{registerForm:{AgentCode:"",Account:"",Password:"",PasswordConfirm:"",ApplyPath:1},confirm1:!1,confirm2:!1,agentCodeDis:!1,pwdVisible:{pwd:!1,confirmPwd:!1,wPwd:!1,confirmWPwd:!1},eye1:"password",eye2:"password",logoUrl:t("266c")}},computed:Object(i["a"])({},Object(a["b"])(["token"])),watch:{token:function(){this.token&&this.$router.push({name:"Home"})}},created:function(){if(this.$refs.videoRef.play(),this.token)this.$router.push({name:"Home"});else{var e=window.location.href.split("AgentCode=")[1],r=sessionStorage.getItem("AgentCode");e?(this.registerForm.AgentCode=e,sessionStorage.setItem("AgentCode",e),this.agentCodeDis=!0):r&&(this.agentCodeDis=!0,this.registerForm.AgentCode=r)}},mounted:function(){this.$refs.videoRef.play()},methods:{registerNewMember:function(){this.$modalHint.show({text:"Demo用 无开放注册"})}}},c=n,l=(t("8a0e"),t("2877")),d=Object(l["a"])(c,s,o,!1,null,"2be39c83",null);r["default"]=d.exports},"8a0e":function(e,r,t){"use strict";var s=t("8d56"),o=t.n(s);o.a},"8d56":function(e,r,t){}}]);