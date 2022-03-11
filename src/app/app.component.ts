import { Component,OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Detail } from './detail.model';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'genderdetect';
  constructor(private http:HttpClient){}
  pred:any=[];
  detail:{"countryid":string,"probability":number}
  path:string;
  nameform:FormGroup;
  ngOnInit(){
      this.nameform=new FormGroup({
        namevalue:new FormControl()
      })
  }
  onsubmit(){
    console.log(this.nameform.value["namevalue"]);
    this.path="https://api.nationalize.io/?name=";
    this.path+=this.nameform.value["namevalue"];
    console.log(this.path);
     this.http.get(this.path).subscribe((data)=>{
        for(let i=0;i<3;i++){
          i.toString();
          this.pred.push(new Detail(data["country"][i]["country_id"],data["country"][i]["probability"]));
        }
        console.log(this.pred);
      })
  }
}
