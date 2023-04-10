import { defineStore } from 'pinia'
import * as signalr from '@microsoft/signalr'
export interface methodGroup {
    method: (ars: any) => any,
    name: string,
}
export const SignalR = defineStore('signalr', {
    state: () => {
        return {
            conn: new signalr.HubConnectionBuilder().withUrl('http://10.40.77.188:32770/chathub').build(),
        }
    },
    actions: {
        Build() {
            this.conn = new signalr.HubConnectionBuilder().withUrl('http://10.40.77.188:32770/chathub',
                {
                    headers: {
                        'Authorization': localStorage.getItem('MyBlogJwt') as string
                    },
                    accessTokenFactory: () => localStorage.getItem('MyBlogJwt') as string
                }).withAutomaticReconnect().configureLogging(signalr.LogLevel.Information).build();
        }
    }
})