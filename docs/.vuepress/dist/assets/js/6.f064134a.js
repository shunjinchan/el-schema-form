(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{145:function(e,t,r){"use strict";var l=r(1),o=r(63),i=r(29),a=r(13),n=r(14),s=r(99),u=r(62),p=r(41),d=r(11),c=p("splice"),m=d("splice",{ACCESSORS:!0,0:0,1:2}),f=Math.max,h=Math.min;l({target:"Array",proto:!0,forced:!c||!m},{splice:function(e,t){var r,l,p,d,c,m,g=n(this),y=a(g.length),b=o(e,y),v=arguments.length;if(0===v?r=l=0:1===v?(r=0,l=y-b):(r=v-2,l=h(f(i(t),0),y-b)),y+r-l>9007199254740991)throw TypeError("Maximum allowed length exceeded");for(p=s(g,l),d=0;d<l;d++)(c=b+d)in g&&u(p,d,g[c]);if(p.length=l,r<l){for(d=b;d<y-l;d++)m=d+r,(c=d+l)in g?g[m]=g[c]:delete g[m];for(d=y;d>y-l+r;d--)delete g[d-1]}else if(r>l)for(d=y-l;d>b;d--)m=d+r-1,(c=d+l-1)in g?g[m]=g[c]:delete g[m];for(d=0;d<r;d++)g[d+b]=arguments[d+2];return g.length=y-l+r,p}})},203:function(e){e.exports=JSON.parse('{"type":"object","properties":{"name":{"title":"活动名称","description":"活动名称描述","component":"input","field":{"placeholder":"活动名称","type":"textarea","listeners":{}},"rules":[{"required":true,"message":"活动名称不能为空","trigger":"change"}]},"count":{"title":"参加人数 title","component":"input","rules":[{"required":true,"message":"参加人数不能为空","trigger":"change"},{"min":10,"max":100,"type":"number"}],"field":{"placeholder":"参加人数","type":"number"}},"organizer":{"title":"活动举办方","component":"autocomplete","rules":[{"required":true,"message":"活动举办方不能为空"}],"field":{"placeholder":"活动举办方"}},"region":{"title":"活动区域","component":"select","rules":[{"required":true,"message":"请选择活动区域","trigger":"change"}],"field":{"clearable":true,"options":[{"value":"shanghai","label":"上海"},{"value":"beijing","label":"北京"}],"placeholder":"活动区域"}},"date":{"title":"活动日期","component":"date-picker","rules":[{"required":true,"message":"请选择活动日期"}],"field":{"placeholder":"活动日期"}},"delivery":{"title":"即时配送","component":"switch","field":{}},"types":{"title":"活动性质","component":"checkbox-group","field":{"options":[{"value":1,"label":"美食/餐厅线上活动"},{"value":2,"label":"地推活动"},{"value":3,"label":"线下主题活动"},{"value":4,"label":"单纯品牌曝光"}]}},"resource":{"title":"特殊资源","component":"radio-group","rules":[{"required":true,"message":"请选择资源类型"}],"field":{"options":[{"value":1,"label":"线上品牌商赞助"},{"value":2,"label":"线下场地免费"}]}},"desc":{"title":"活动形式","component":"input","rules":[{"required":true,"message":"活动形式不能为空"}],"field":{"type":"textarea"}},"link":{"title":"链接示例","component":"link","field":{"target":"_blank","text":"谷歌链接"}},"plain_text":{"title":"文本示例","component":"plain-text"},"image":{"title":"上传图片","component":"upload","rules":[{"required":true,"message":"请上传图片","trigger":["change"]}],"field":{"action":"","tip":"提示信息","drag":true,"multiple":true}},"color":{"title":"颜色","component":"color-picker","rules":[{"required":true,"message":"请选择颜色","trigger":["change"]}]},"users":{"type":"array","title":"用户列表","description":"用户个数必须 >= 1 && <= 4","minItems":1,"maxItems":4,"items":{"type":"object","default":{"name":"","age":"","family":{"parent":{"father":"","mother":""},"siblings":[""]},"friends":[""],"hobby":[""]},"order":["name","age","family"],"properties":{"name":{"title":"用户名","component":"input","rules":[{"required":true,"trigger":"blur"}],"field":{"placeholder":"请输入用户名"}},"family":{"type":"object","border":false,"properties":{"parent":{"type":"object","title":"父母","properties":{"father":{"title":"父亲名字","component":"input","rules":[{"required":true,"trigger":"blur"}],"field":{"placeholder":"请填写父亲名字"}},"mother":{"title":"母亲名字","component":"input","rules":[{"required":true,"trigger":"blur"}],"field":{"placeholder":"请填写母亲名字"}}}}}}}},"border":false,"addable":{"text":"新增用户","type":"primary","style":{"fontSize":"14px"}},"removable":true,"orderable":true}}}')},204:function(e){e.exports=JSON.parse('{"name":"name","organizer":"organizer","count":33,"region":"shanghai","date":"","delivery":false,"types":[1,2],"resource":"","desc":"","link":"//google.com","plain_text":"文本示例文案","dynamic_component":"","dynamic_component2":"","image":"","hobby":["打篮球","看动画片"],"color":"#000000","users":[{"name":"user 1","age":11,"family":{"parent":{"father":"user 1 father","mother":"user 2 mother"},"siblings":[""]},"friends":["1"],"hobby":["打篮球","看动画片"]}]}')},205:function(e){e.exports=JSON.parse('[{"rowAttrs":{"type":"flex","style":"flex-wrap: wrap;","gutter":40},"col":[{"colAttrs":{"span":12},"fields":["name","region","organizer","date","count","delivery","types"]},{"colAttrs":{"span":12},"fields":["color","dynamic_component","dynamic_component2","link","plain_text","resource","desc","image"]}]},{"title":"复杂例子","rowAttrs":{"type":"flex","style":"flex-wrap: wrap;","gutter":40},"col":[{"colAttrs":{"span":12},"fields":["users"]}]}]')},266:function(e,t,r){"use strict";r.r(t);r(145);var l=r(203),o=r(204),i=r(205),a={data:function(){return{model:o,schema:l,layout:i,config:{labelPosition:"top"}}},methods:{handleAddField:function(e){this.model.users.push(e.additionalItems.default),this.$refs.form.updateSchema()},handleRemoveField:function(e,t){this.model.users.splice(t,1),this.$refs.form.updateSchema()},handleMoveUp:function(e,t){this.swapUsers(t,t-1)},handleMoveDown:function(e,t){this.swapUsers(t,t+1)},swapUsers:function(e,t){var r=this.model.users[t];this.model.users.splice(t,1,this.model.users[e]),this.model.users.splice(e,1,r)}}},n=r(28),s=Object(n.a)(a,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("el-schema-form",{ref:"form",attrs:{schema:e.schema,model:e.model,config:e.config,layout:e.layout,"auto-update":!0},on:{add:e.handleAddField,remove:e.handleRemoveField,"move-up":e.handleMoveUp,"move-down":e.handleMoveDown}})}),[],!1,null,"76afd393",null);t.default=s.exports}}]);