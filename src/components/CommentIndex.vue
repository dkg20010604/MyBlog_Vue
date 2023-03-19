<template>
    <div class="Comment">
        <el-card v-for="item in OrIndex.comments" shadow="hover" :body-style="{ padding: '20px' }">
            <div class="CommentCard">
                <div class="basecomment">
                    <div style="display: flex;align-items: center;">
                        <el-popover :show="showPopover(item.userId)" placement="bottom" trigger="hover" content="">
                            <template #reference>
                                <el-avatar :src="item.headurl" />
                            </template>
                            <span>{{ userinfo?.nickName }}</span>
                            <div>
                                <p>粉丝：{{ userinfo?.fans }}</p>
                                <p>个人简介：{{ userinfo?.inyro?.length ? userinfo?.inyro : '这个人没有简介' }}</p>
                            </div>
                        </el-popover>
                    </div>
                    <div>
                        <div style="margin-top: -5px;">
                            <p style="font-size:medium;">{{ item.commentText }}</p>
                        </div>
                        <div style="display:flex;flex: auto; align-items: right;width: 100%;">
                            <div>
                                <el-button text bg type="primary" size="default" @click="">回复</el-button>
                            </div>
                            <div style="margin-left: auto;">
                                <p style="text-align: right;;">{{ item.releaseTime?.getFullYear() + ' 年 ' +
                                    item.releaseTime?.getMonth()
                                    + ' 月 '
                                    + item.releaseTime?.getDay() + ' 日' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="recomment" v-if="item.children">
                    <CommentIndex :comments="item.children"></CommentIndex>
                </div>
            </div>
        </el-card>
    </div>
</template>
    
<script lang="ts" setup>
import { PictureClient, UserClient, type UserDTO } from '@/controller';
import { onMounted, reactive, ref } from 'vue'
import CommentIndex from '@/components/CommentIndex.vue'
const OrIndex = defineProps(['comments'])
const userinfo = ref<UserDTO>()
onMounted(async () => {

    (OrIndex.comments as any[]).forEach(async value => {
        const res = (await new PictureClient().getHeadById(value.userId))

        value['headurl'] = URL.createObjectURL(res.data)
    })
})
const showPopover = async (id: number) => {
    userinfo.value = (await new UserClient().getUserInfoById(id)).data
}
</script>
    
<style scoped>
.Comment {
    align-items: center;
    margin-top: 50px;
    width: 98%;
}

.CommentCard {
    font-size: small;
}
</style>
    