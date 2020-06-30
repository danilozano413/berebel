import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit
{

    public user : any = {
        name: "Dani",
        email: "danilozanoescarti@gmail.com"
    };
    
    
    constructor() {}

    ngOnInit() {}

    logout()
    {

    }

}
