<template>
    <el-input v-model="searchtext" placeholder="" clearable @change="">
        <template #append>
            <div>
                <el-button type="primary" size="default" @click="">搜索</el-button>

            </div>
        </template>
    </el-input>
    <div class="grouplist">
        <el-card v-if="group" class="piccard" v-for="i in group" style="width: 30%;" shadow="hover"
            :body-style="{ padding: '0px', height: '100%', width: '100%' }" @click="showpics(i.groupId as number)">
            <div style="height: 100%;width: 100%;display: flex;justify-content: flex-end;align-items: flex-end"
                :style="{ background: 'url(' + i.facepic + ')', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPositionX: 'center' }">
                <div style="background-color:rgba(71,244,189, 0.8);">
                    <span style="font-size: 30px;margin-right: 10px;color: ;">{{ i.groupName }}</span>
                </div>
            </div>
        </el-card>
        <el-card class="piccard" style="width: 30%;" @click="showdialog = true" shadow="hover"
            :body-style="{ padding: '20px' }">
            <div class="cardbody">
                <add-pic class="addpic" theme="outline" size="140" fill="#000000" :strokeWidth="3" />
                <span>添加相册</span>
            </div>
        </el-card>
    </div>
    <el-dialog title="添加相册" v-model="showdialog" width="30%">
        <div>
            <el-form-item label="输入相册名称：" size="default">
                <el-input v-model="picname" placeholder="" size="default" clearable></el-input>
            </el-form-item>
        </div>
        <template #footer>
            <span>
                <el-button @click="showdialog = false; ">取消</el-button>
                <el-button type="primary" @click="pluspic">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
    
<script lang='ts' setup>
import { UserGroupClient, PictureClient, type UserGroupDTO } from '@/controller'
import { AddPic } from '@icon-park/vue-next'
import { useRouter } from 'vue-router';
interface GroupPic extends UserGroupDTO {
    facepic?: string
}
const router = useRouter()
const searchtext = ref();
const client = new UserGroupClient()
const picclient = new PictureClient()
const group = ref<GroupPic[]>()
const showdialog = ref(false)
onBeforeMount(async () => {
    group.value = (await client.getGroup()).data
    group.value.forEach(async item => {
        item.facepic = URL.createObjectURL((await picclient.getTheardPic(item.groupId)).data)
    })
})
const picname = ref('')
const pluspic = () => {
    if (picname.value.length < 2) {
        ElMessage.warning('相册名过短');
        return;
    }
    client.addGroup(picname.value).then(async (res) => {
        if (res.data) {
            picname.value = '';
            ElMessage.success('添加成功');
            showdialog.value = false
            group.value = (await client.getGroup()).data
        }
    })
}
const showpics = (id: number) => {
    router.push({
        name: 'viewpicture',
        params: {
            id: id
        }
    })
}


</script>
    
<style scoped>
.grouplist {
    display: flex;
    width: 99%;
    margin: auto;
    flex-wrap: wrap;
    align-items: center;
    justify-items: center;
}

.piccard {
    display: flex;
    justify-items: center;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 200px;
    cursor: pointer;
    flex-direction: column-reverse;
    align-items: end;
}

.cardbody {
    display: flex;
    justify-items: center;
    align-items: center;
}

.addandok {
    padding: auto;
    display: flex;
    flex-direction: column;
    margin: auto;
    justify-content: flex-end;
    align-items: center;
}

.uploadbutton {
    width: 100px;
    height: 40px;
}



v-images-wrap {
    z-index: 9999;
}

.picdrawer {
    z-index: 199;
}
</style>