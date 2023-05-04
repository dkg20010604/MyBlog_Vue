import type { UserDTO } from '@/controller';
import { defineStore } from 'pinia'
export const MenuIndex = defineStore("MenuIndex", {
  state: () => {
    return {
      index: '',
      menuOption: '' as any,
      userinfo: reactive<UserDTO>({
        id: 0,
        nickName: '',
        userImg: ''
      }),
    }
  },
  actions: {
    SetMenu(menu: string) {
      this.index = menu;
    },
    setUserHeaderImg(user: string) {
      this.userinfo.userImg = user
    }
  },
  getters: {

  }
})
