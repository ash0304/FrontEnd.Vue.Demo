(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4ca81293"],{"6a7c":function(t,e,o){t.exports=o.p+"static/media/bg_batch.0ac1f715.mp4"},a55b:function(t,e,o){"use strict";o.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login-register flex flex-center flex-items-center"},[s("video",{ref:"videoRef",staticClass:"video",attrs:{autoplay:"",preload:"preload",loop:"",muted:""},domProps:{muted:!0}},[s("source",{attrs:{src:o("6a7c"),type:"video/mp4"}})]),s("div",{staticClass:"form-container"},[s("router-link",{attrs:{to:"/Home"}},[s("div",{staticClass:"logo",style:{"background-image":"url("+t.logoUrl+")"}})]),s("div",{staticClass:"title"},[t._v(t._s(t.$t("login.userLogin")))]),s("div",{staticClass:"form",on:{keyup:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.Account&&t.Password&&t.login()}}},[s("div",{staticClass:"form-row"},[s("div",{staticClass:"icon member"}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.Account,expression:"Account"}],attrs:{type:"text",placeholder:t.$t("login.enterAccountTip"),maxlength:"20"},domProps:{value:t.Account},on:{input:function(e){e.target.composing||(t.Account=e.target.value)}}})]),s("div",{staticClass:"form-row"},[s("div",{staticClass:"icon locker"}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.Password,expression:"Password"}],attrs:{type:"password",placeholder:t.$t("login.enterPasswordTip"),maxlength:"20"},domProps:{value:t.Password},on:{input:function(e){e.target.composing||(t.Password=e.target.value)}}})]),s("div",{staticClass:"form-row"},[s("div",{staticClass:"btn",class:{active:t.Account&&t.Password},on:{click:t.login}},[t._v(t._s(t.$t("login.login")))])]),s("div",{staticClass:"form-row flex flex-between flex-items-center"},[s("a",{on:{click:t.forgetPwd}},[t._v(t._s(t.$t("login.forgetPwd")))]),s("router-link",{attrs:{to:"/Register"}},[t._v(t._s(t.$t("login.accountRegister")))])],1)])],1)])},i=[],n=o("2fa1"),a=o("2f62"),r={name:"Login",data:function(){return{Account:"ash123",Password:"123456",logoUrl:o("266c")}},computed:Object(n["a"])({},Object(a["b"])(["token"])),created:function(){this.$refs.videoRef.play(),this.token&&this.$router.push({name:"Home"}).catch((function(){}))},mounted:function(){this.$refs.videoRef.play()},methods:{login:function(){var t=this,e={LoginAccount:this.Account,Password:this.Password};this.$store.dispatch("user/login",e).then((function(e){"success"===e?(t.$store.dispatch("user/getInfo"),t.$router.push({name:"Profile"}).catch((function(){}))):t.$modalHint.show({text:t.$t("login.error1")})}))},forgetPwd:function(){this.$modalHint.show({text:"请洽客服，取得重置密码",isDoubleModal:!1})}}},c=r,l=o("2877"),u=Object(l["a"])(c,s,i,!1,null,null,null);e["default"]=u.exports}}]);