<template>
    <div class="Comment">
        <el-card v-for="item in order" shadow="hover" :body-style="{ padding: '20px' }">
            <div class="CommentCard">
                <div class="basecomment">
                    <div style="display: flex;align-items: center;">
                        <el-popover :show="showPopover(item.userId as number)" placement="bottom" trigger="hover"
                            content="">
                            <template #reference>
                                <el-avatar :src="item.headimg" />
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
                        <div style="float: right;">
                            <like @click="likeComment(item.commend as number)" theme="two-tone" size="30"
                                :fill="['#000', '#fff']" :strokeWidth="3" />
                            {{ item.likeCount }}
                        </div>

                        <div style="display:flex;flex: auto; align-items: right;width: 100%;">
                            <div>
                                <div class="response">
                                    <el-input :key="componentKey" ref="epin"
                                        v-if="item.writeresponse && item.recomm?.commentText?.length != undefined"
                                        v-model="retext" size="default" clearable
                                        @change="change(item.recomm as CommentDTO)">
                                    </el-input>
                                </div>
                                <el-button text bg type="primary" size="default" @click="sendmessage(item)">{{
                                    !item.writeresponse ? '回复' : '发送' }}</el-button>
                            </div>
                            <div style="margin-left: auto;">
                                <p>{{ item.releaseTime?.toString() }}</p>
                            </div>
                        </div>
                        <div class="showrecommen">
                            <el-button style="justify-items: right;display: flex;" type="primary" text size="small"
                                @click="getresponst(item as detie)">查看回复</el-button>
                        </div>
                    </div>
                </div>
                <div class="recomment">
                    <CommentIndex v-if="item.children?.length as number > 0" :comments="item.children"></CommentIndex>
                </div>
            </div>
        </el-card>
    </div>
</template>
    
<script lang="ts" setup>
import { CommentClient, PictureClient, UserClient, type CommentDTO, type UserDTO } from '@/controller';
import { onMounted, reactive, ref } from 'vue'
import CommentIndex from '@/components/CommentIndex.vue'
import { Like, Equalizer } from '@icon-park/vue-next'
const client = new CommentClient()
const OrIndex = defineProps<{
    comments: CommentDTO[] | undefined
}>()
const userinfo = ref<UserDTO>()
interface detie extends CommentDTO {
    writeresponse?: boolean
    headimg?: string;
    recomm?: CommentDTO
}
const componentKey = ref(0);
const epin = ref()
const order = reactive<detie[]>(OrIndex.comments as detie[])
onBeforeMount(async () => {
    order.forEach(async value => {
        const res = (await new PictureClient().getHeadById(value.userId as number))
        value.recomm = {
            commentText: '',
            writerComment: false,
            headimg: '',
        } as CommentDTO
        value.headimg = URL.createObjectURL(res.data)
    })

})
const showPopover = async (id: number) => {
    userinfo.value = (await new UserClient().getUserInfoById(id)).data
}
const retext = ref('');
const change = (item: CommentDTO) => {
    console.log(item.commentText);

}
const sendmessage = async (item: detie) => {
    componentKey.value++;
    item.recomm = {
        articleId: item.articleId,
        isResponse: true,
        responseId: item.commend,
        commentText: ''
    }
    item.writeresponse = !item.writeresponse
    if (!item.writeresponse) {
        if (retext.value.length < 1) {
            ElMessage.warning('评论不得为空')
            return;
        }
        item.recomm.commentText = retext.value
        ElMessage.info('正在发送')
        console.log(item.recomm);

        await client.addComment(item.recomm).then(data => {
            if (data.code == 200) {
                ElMessage.success('发送成功')
                item.recomm = '' as CommentDTO
                retext.value = ''
            }
            else {
                ElMessage.error('发送失败')
            }
        }).catch(() => {
            ElMessage.error('发送失败')
        })
    }

}
const getresponst = async (item: detie) => {
    item.children = (await client.getResponse(item.commend as number)).data
    console.log(item.children);
}
const likeComment = async (id: number) => {
    await client.upLike(id).then(res => {
        if (res.code == 200)
            ElMessage.success(res.message)
        else
            ElMessage.error(res.message)

    }).catch(() => {
        ElMessage.error("网络错误")
    }
    )
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

.showrecommen {
    display: flex;
    justify-items: center;
    align-items: center;
}
</style>
    