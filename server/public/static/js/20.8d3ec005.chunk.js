(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[20],{146:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(65),a=n(0),o=function(e){var t=Object(a.useState)(e),n=Object(r.a)(t,2),o=n[0],c=n[1];return Object(a.useEffect)((function(){document.title=o}),[o]),[o,c]}},149:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"b",(function(){return o}));var r=function(e){return(Math.round(100*e)/100).toFixed(2)},a=function(e){return new Date(e).toLocaleString().slice(0,-3)},o=function(e){return new Date(e).toLocaleDateString()}},155:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"d",(function(){return f})),n.d(t,"f",(function(){return l})),n.d(t,"b",(function(){return y})),n.d(t,"e",(function(){return h})),n.d(t,"c",(function(){return b}));var r=n(18),a=n.n(r),o=n(29),c=n(30),u=n.n(c),s=n(32),i=n(10),p=n(67),d=function(e){return function(){var t=Object(o.a)(a.a.mark((function t(n,r){var o,c,d,f,l,y;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n({type:i.b}),o=r(),c=o.loginUser.userInfo,d={headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(c.token)}},t.next=6,u.a.post("/api/orders",e,d);case 6:f=t.sent,l=f.data.order,n({type:i.d,payload:l}),n({type:s.c,payload:l}),localStorage.removeItem("cart-items"),t.next=18;break;case 13:t.prev=13,t.t0=t.catch(0),"You are not authorized. Token failed."===(y=t.t0.response&&t.t0.response.data.message?t.t0.response.data.message:t.t0.message)&&n(Object(p.e)()),n({type:i.a,payload:y});case 18:case"end":return t.stop()}}),t,null,[[0,13]])})));return function(e,n){return t.apply(this,arguments)}}()},f=function(e){return function(){var t=Object(o.a)(a.a.mark((function t(n,r){var o,c,s,d,f,l;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n({type:i.m}),o=r(),c=o.loginUser.userInfo,s={headers:{Authorization:"Bearer ".concat(c.token)}},t.next=6,u.a.get("/api/orders/".concat(e),s);case 6:d=t.sent,f=d.data.order,n({type:i.n,payload:f}),t.next=16;break;case 11:t.prev=11,t.t0=t.catch(0),"You are not authorized. Token failed."===(l=t.t0.response&&t.t0.response.data.message?t.t0.response.data.message:t.t0.message)&&n(Object(p.e)()),n({type:i.l,payload:l});case 16:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(e,n){return t.apply(this,arguments)}}()},l=function(e,t){return function(){var n=Object(o.a)(a.a.mark((function n(r,o){var c,s,d,f,l,y;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,r({type:i.t}),c=o(),s=c.loginUser.userInfo,d={headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(s.token)}},n.next=6,u.a.put("/api/orders/".concat(e,"/pay"),t,d);case 6:f=n.sent,l=f.data.order,r({type:i.v,payload:l}),n.next=16;break;case 11:n.prev=11,n.t0=n.catch(0),"You are not authorized. Token failed."===(y=n.t0.response&&n.t0.response.data.message?n.t0.response.data.message:n.t0.message)&&r(Object(p.e)()),r({type:i.s,payload:y});case 16:case"end":return n.stop()}}),n,null,[[0,11]])})));return function(e,t){return n.apply(this,arguments)}}()},y=function(e){return function(){var t=Object(o.a)(a.a.mark((function t(n,r){var o,c,s,d,f,l;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n({type:i.f}),o=r(),c=o.loginUser.userInfo,s={headers:{Authorization:"Bearer ".concat(c.token)}},t.next=6,u.a.put("/api/orders/".concat(e._id,"/deliver"),{},s);case 6:d=t.sent,f=d.data.order,n({type:i.h,payload:f}),t.next=16;break;case 11:t.prev=11,t.t0=t.catch(0),"You are not authorized. Token failed."===(l=t.t0.response&&t.t0.response.data.message?t.t0.response.data.message:t.t0.message)&&n(Object(p.e)()),n({type:i.e,payload:l});case 16:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(e,n){return t.apply(this,arguments)}}()},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return function(){var t=Object(o.a)(a.a.mark((function t(n,r){var o,c,s,d,f,l;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n({type:i.p}),o=r(),c=o.loginUser.userInfo,s={headers:{Authorization:"Bearer ".concat(c.token)}},t.next=6,u.a.get("/api/orders/myorders/?pageNumber=".concat(e),s);case 6:d=t.sent,f=d.data,n({type:i.r,payload:f}),t.next=16;break;case 11:t.prev=11,t.t0=t.catch(0),"You are not authorized. Token failed."===(l=t.t0.response&&t.t0.response.data.message?t.t0.response.data.message:t.t0.message)&&n(Object(p.e)()),n({type:i.o,payload:l});case 16:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(e,n){return t.apply(this,arguments)}}()},b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return function(){var t=Object(o.a)(a.a.mark((function t(n,r){var o,c,s,d,f,l;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n({type:i.j}),o=r(),c=o.loginUser.userInfo,s={headers:{Authorization:"Bearer ".concat(c.token)}},t.next=6,u.a.get("/api/orders/?pageNumber=".concat(e),s);case 6:d=t.sent,f=d.data,n({type:i.k,payload:f}),t.next=16;break;case 11:t.prev=11,t.t0=t.catch(0),"You are not authorized. Token failed."===(l=t.t0.response&&t.t0.response.data.message?t.t0.response.data.message:t.t0.message)&&n(Object(p.e)()),n({type:i.i,payload:l});case 16:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(e,n){return t.apply(this,arguments)}}()}},167:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PayPalButton=void 0;var r=c(n(0)),a=c(n(24)),o=c(n(7));function c(e){return e&&e.__esModule?e:{default:e}}function u(e){return(u="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t){return!t||"object"!==u(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var y=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=p(this,d(t).call(this,e))).state={isSdkReady:!1},n}var n,o,c;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(t,e),n=t,(o=[{key:"componentDidMount",value:function(){"undefined"!==typeof window&&void 0!==window&&void 0===window.paypal?this.addPaypalSdk():"undefined"!==typeof window&&void 0!==window&&void 0!==window.paypal&&this.props.onButtonReady&&this.props.onButtonReady()}},{key:"createOrder",value:function(e,t){var n=this.props,r=n.currency,a=n.options,o=n.amount,c=n.shippingPreference;return t.order.create({purchase_units:[{amount:{currency_code:r||(a&&a.currency?a.currency:"USD"),value:o.toString()}}],application_context:{shipping_preference:c}})}},{key:"onApprove",value:function(e,t){var n=this;return t.order.capture().then((function(t){if(n.props.onSuccess)return n.props.onSuccess(t,e)})).catch((function(e){if(n.props.catchError)return n.props.catchError(e)}))}},{key:"render",value:function(){var e=this,t=this.props,n=t.amount,o=t.onSuccess,c=t.createOrder,u=t.createSubscription,i=t.onApprove,p=t.style;if(!this.state.isSdkReady&&("undefined"===typeof window||void 0===window.paypal))return null;var d=window.paypal.Buttons.driver("react",{React:r.default,ReactDOM:a.default}),f=n&&!c?function(t,n){return e.createOrder(t,n)}:function(e,t){return c(e,t)};return r.default.createElement(d,s({},this.props,{createOrder:u?void 0:f,createSubscription:u,onApprove:o?function(t,n){return e.onApprove(t,n)}:function(e,t){return i(e,t)},style:p}))}},{key:"addPaypalSdk",value:function(){var e=this,t=this.props,n=t.options,r=t.onButtonReady,a=[];Object.keys(n).forEach((function(e){var t=e.split(/(?=[A-Z])/).join("-").toLowerCase();a.push("".concat(t,"=").concat(n[e]))}));var o=document.createElement("script");o.type="text/javascript",o.src="https://www.paypal.com/sdk/js?".concat(a.join("&")),o.async=!0,o.onload=function(){e.setState({isSdkReady:!0}),r&&r()},o.onerror=function(){throw new Error("Paypal SDK could not be loaded.")},document.body.appendChild(o)}}])&&i(n.prototype,o),c&&i(n,c),t}(r.default.Component);t.PayPalButton=y,l(y,"propTypes",{amount:o.default.oneOfType([o.default.number,o.default.string]),currency:o.default.oneOfType([o.default.number,o.default.string]),shippingPreference:o.default.string,onSuccess:o.default.func,catchError:o.default.func,onError:o.default.func,createOrder:o.default.func,createSubscription:o.default.func,onApprove:o.default.func,style:o.default.object,options:o.default.shape({clientId:o.default.string,merchantId:o.default.string,currency:o.default.oneOfType([o.default.number,o.default.string]),intent:o.default.string,commit:o.default.oneOfType([o.default.bool,o.default.string]),vault:o.default.oneOfType([o.default.bool,o.default.string]),component:o.default.string,disableFunding:o.default.string,disableCard:o.default.string,integrationDate:o.default.string,locale:o.default.string,buyerCountry:o.default.string,debug:o.default.oneOfType([o.default.bool,o.default.string])}),onButtonReady:o.default.func}),l(y,"defaultProps",{style:{},options:{clientId:"sb",currency:"USD"},shippingPreference:"GET_FROM_FILE"})},173:function(e,t,n){"use strict";n.r(t);var r=n(18),a=n.n(r),o=n(29),c=n(65),u=n(0),s=n(13),i=n(26),p=n(30),d=n.n(p),f=n(167),l=n(68),y=n(155),h=n(10),b=n(149),v=n(146),m=n(1);t.default=function(){Object(v.a)("MERN Shop | PayPal");var e=Object(u.useState)(!1),t=Object(c.a)(e,2),n=t[0],r=t[1],p=Object(i.c)((function(e){return e.createOrder})).order,g=Object(i.c)((function(e){return e.payOrder})).loading,O=Object(i.c)((function(e){return e.payOrder})).success,j=Object(i.c)((function(e){return e.cart})),w=Object(i.b)(),k=Object(s.k)();return Object(u.useEffect)((function(){var e=d.a.CancelToken.source(),t=function(){var t=Object(o.a)(a.a.mark((function t(){var n,o,c;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.get("/api/config/paypal",{cancelToken:e.token});case 2:n=t.sent,o=n.data,(c=document.createElement("script")).type="text/javascript",c.src="https://www.paypal.com/sdk/js?client-id=".concat(o),c.async=!0,c.onload=function(){r(!0)},document.body.appendChild(c);case 10:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return(p||O)&&(w({type:h.u}),w(Object(y.d)(p._id))),window.paypal?r(!0):t(),function(){e.cancel("axios request cancelled")}}),[w,O,p]),Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("h1",{className:"text-center",children:"Pay with:"}),Object(m.jsxs)("div",{style:{margin:"10% auto 0",maxWidth:"400px"},children:[g&&Object(m.jsx)(l.a,{}),n?Object(m.jsx)(f.PayPalButton,{onClick:function(){w(Object(y.a)({orderItems:j.cartItems,shippingAddress:j.shippingAddress,paymentMethod:j.paymentMethod,itemsPrice:j.itemsPrice,shippingPrice:j.shippingPrice,totalPrice:j.totalPrice}))},amount:Object(b.a)(j.totalPrice),onSuccess:function(e){w(Object(y.f)(p._id,e)),w({type:h.c}),k.push("/order/".concat(p._id))}}):Object(m.jsx)(l.a,{})]})]})}}}]);
//# sourceMappingURL=20.8d3ec005.chunk.js.map