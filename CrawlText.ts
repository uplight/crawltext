/**
 * Created by Vlad on 4/20/2016.
 */
    ///<reference path="typings/jquery.d.ts"/>
    ///<reference path="typings/underscore.d.ts"/>



module crawltext{
    export class CrawlText{
        data:string;
        private timer:number;

        //////test
        private test:number[]=[1,10,2,5];
        private count:number=0;
//////////////tets
        constructor(public $view:JQuery){
            this.getData();
            this.timer = setInterval(()=>this.getData(),20000);
        }

        getData():void{
            $.get("http://callcenter.front-desk.ca/service/crawl?a=get").done((res)=>{
                if(!res.list)return;
                if(this.count>= this.test.length)this.count = 0;
                var ar = res.list;

                ///Test
               var out:string[] = [];
                for(var i=0,n=this.test[this.count++];i<n;i++)out.push(ar[i]);

                ar= out;
                ////test
                console.log('length '+ar.length);
                var text:string = ar.join("\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 \u00a0");
                if(this.data == text) return;
                this.data = text;
                this.render();
            }).fail((err)=>{
                console.error(err);
            })

        }
        private render():void{
            console.log('re render');
            this.$view.text(this.data)
        }
    }

   /* var Texts;
    var Control = document.getElementById("MarqueCotrol1");
    var Timer;
    GetText();
    function Update() {
        Control.innerText = Texts.list.join("\u00a0\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 ");
    }
    function GetText() {
        console.log("GetText");
        var Req;
        if ("onload" in new XMLHttpRequest()) {
            Req = new XMLHttpRequest();
        } else {
            Req = new XDomainRequest();
        }

        Req.open("GET", "http://callcenter.front-desk.ca/service/crawl?a=get", true);

        Req.onload = function () {
            var Temp = JSON.parse(Req.responseText);
            if (Texts === undefined) {
                Texts = Temp;
                Update();
            } else {
                if (Texts.list.join("") != Temp.list.join("")) {
                    console.log("Update");
                    Texts = Temp;
                    Update();
                }
            }

        }
        Req.send();
    }

    setInterval(GetText, 20000);
*/
}
