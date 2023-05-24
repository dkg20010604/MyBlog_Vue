import { defineStore } from 'pinia'
import * as signalr from '@microsoft/signalr'
export interface methodGroup {
    method: (ars: any) => any,
    name: string,
}
export const SignalR = defineStore('signalr', {
    state: () => {
        return {
            conn: new signalr.HubConnectionBuilder().withUrl('http://127.0.0.1:32770/chathub').build(),
        }
    },
    actions: {
        Build() {
            this.conn = new signalr.HubConnectionBuilder().withUrl('http://127.0.0.1:32770/chathub',
                {
                    headers: {
                        Authorization: (localStorage.getItem('MyBlogJwt') as string).split(' ')[1]
                    },
                    accessTokenFactory: () => localStorage.getItem('MyBlogJwt') as string
                }).withAutomaticReconnect().configureLogging(signalr.LogLevel.Information).build();
        }
    }
})