import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit
{


    public clientId: string = null;
    public clientSecret: string = null;

    constructor() {}

    ngOnInit()
    {
        this.clientId = "ck_9276c847402390ff0a12d9e81cecebea93bdb2b3";
        this.clientSecret = "cs_d39925b58d4bd559388a9b670d7dade57a870c60"
    }

}
