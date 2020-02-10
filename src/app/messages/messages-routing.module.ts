import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessagesComponent } from './messages.component';
import { AddMessageComponent } from './add-message/add-message.component';
import { ReceivedMessagesComponent } from './received-messages/received-messages.component';
import { SendedMessagesComponent } from './sended-messages/sended-messages.component';
import { UserGuard } from '../services/user.guard';


const routes: Routes = [
    {
        path: 'messages', component: MessagesComponent, canActivate: [UserGuard],
        children: [
            {path: 'received', component: ReceivedMessagesComponent},
            {path: 'received/:page', component: ReceivedMessagesComponent},
            {path: '', redirectTo: 'received', pathMatch: 'full'},
            {path: 'send', component: AddMessageComponent},
            {path: 'sended/:page', component: SendedMessagesComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class MessagesRoutingModule {

}
