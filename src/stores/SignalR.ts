import { defineStore } from 'pinia'
import * as signalr from '@microsoft/signalr'
export const SignalR = defineStore('signalr', {
    state: () => {
        return {
            conn: new signalr.HubConnectionBuilder().withUrl('http://localhost:5064/chathub').build()
        }
    },
    actions: {
        Build() {
            this.conn = new signalr.HubConnectionBuilder().withUrl('http://localhost:5064/chathub',
                {
                    headers: {
                        'Authorization': localStorage.getItem('MyBlogJwt') as string
                    },
                    accessTokenFactory: () => localStorage.getItem('MyBlogJwt') as string
                }).withAutomaticReconnect().configureLogging(signalr.LogLevel.Error).build()
        }
    }
})