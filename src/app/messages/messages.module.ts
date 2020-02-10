import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesComponent } from './messages.component';
import { AddMessageComponent } from './add-message/add-message.component';
import { ReceivedMessagesComponent } from './received-messages/received-messages.component';
import { SendedMessagesComponent } from './sended-messages/sended-messages.component';
import { MessagesRoutingModule } from './messages-routing.module';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

@NgModule({
    declarations: [
        MessagesComponent, AddMessageComponent, ReceivedMessagesComponent, SendedMessagesComponent
    ],
    imports: [
        MessagesRoutingModule,
        CommonModule,
        FormsModule,
        MomentModule
    ],

    providers: []
})
export class MessagesModule {
}
