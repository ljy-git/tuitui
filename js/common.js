// -----------所有页面公用的vue行为

Vue.component('rank', {
    props:{
        val: {type: [Number], default: 5 },
        hh: {type: [Number], default: 14 }
    },
    data:function (){
        return  {
            total:this.hh*6.727,
            current:(this.hh*6.727*this.val)/5,

        }
    },
    template: "<div class='rank'><div class='stars' :style=\"{height: hh + 'px', width: this.total+ 'px'}\"><p :style=\"{clip:'rect(0px,'+this.current+'px,20px,0px)'}\"></p></div>{{val}}分</div>"
});


Vue.component('lockDiv', {
    props:{
        per: {type: [Number,String], default: 100 },
        bg: {type: [String], default: ""},
        link: {type: [String], default: ""}
    },
    data:function (){
        return  {
            hh:100
        }
    },
    template: "<div class='lockDiv' :style=\"{height: hh + 'px', backgroundImage: 'url(' + bg + ')'}\" @click='clickH'><slot></slot></div>",
    methods: {
        clickH:function(){
            if(this.link){
                window.location.href=this.link;
            }
        }
    },
    mounted: function() {
        this.hh = this.$el.offsetWidth* this.per/100;
    }
});

Vue.component('dInputNumber', {
    props:['num','index'],
    data:function (){
        return  {
           i_num:this.num,
           i_min:1,
           i_max:99
        }
    },
    watch: {
        i_num: function(newValue, oldValue) {
            this.$emit("change",
                {
                    num:this.i_num,
                    index:this.index
                }

                );
        }
    },
    template: "<div class='InputNumber'> <div class='minus' @click='minusH'>－</div> <div class='num'><input type='number' v-model='i_num'></div> <div class='add' @click='addH'>＋</div> </div>",
    methods: {
        minusH:function(){
            this.i_num = Math.max(this.i_min,this.i_num-1);
        },
        addH:function(){
            this.i_num = Math.min(this.i_max,this.i_num+1);
        }
    }
});


var mixin_common = {
    data:{
        arr_pay_mode:["未付款","已付款","订单已取消","已完成"]
        
    },
    created: function() {
    },

    mounted: function() {
    },
    methods: {
        isEmpty:function(para){
            return para ? false : true  ;
        },
        dropdownH:function(e){
            this.city = e;
        }
    }
    
};

// -------如果要得所有页面的Ajax统一管理，写在此处（预留）
var mixin_ajaxPost = {};

// --------文字层自动切换，记得层的class="txt_expand"

const HEIGHT_3_LINES = 60;
var mixin_txt_expand = {
    methods: {

        click_txt_expand: function(el) {
            var _parent = el.target.parentNode;
            if (_parent.classList.contains("active")) {
                _parent.classList.remove("active")
            } else {
                _parent.classList.add("active")
            }
        }
    },
    mounted: function() {
        var arr = document.querySelectorAll(".txt_expand");
        arr.forEach(function(obj, index) {

            var _span = obj.querySelector("span");
            var _i = obj.querySelector("i");

            if (_span.clientHeight < HEIGHT_3_LINES) {
                _i.parentNode.removeChild(_i);
            };

        });
    }
};

