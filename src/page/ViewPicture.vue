<template>
    <div class="images">
        <el-image :preview-src-list="files" hide-on-click-modal v-if="showimg" style="max-width: 48%;margin: auto; margin-top: 8px;"
            sizes="200" v-for="(file, index) of files" :src="file" alt=""></el-image>
    </div>
    <div class="uparea">
        <el-upload list-type="picture-card" :action="action" ref="upload" :on-remove="removepic" :auto-upload="false"
            multiple :limit="10" :on-preview="preview" :file-list="uppiclist" :headers="upheaders">
            <div class="addandok">
                <el-icon>
                    <Plus></Plus>
                </el-icon>
            </div>
        </el-upload>
        <el-dialog v-model="showimgdialog">
            <img w-full :src="clickimag">
        </el-dialog>
        <el-button style="margin-left: 20px;;" type="primary" size="default" @click="">确定上传</el-button>

    </div>
</template>
    
<script lang='ts' setup>
import router from '@/router';
import type { UploadInstance, UploadProps, UploadUserFile } from 'element-plus';
import { PictureClient } from '@/controller'
import { v3ImgPreviewFn } from 'v3-img-preview';
import { useRoute } from 'vue-router';
import { Plus } from '@element-plus/icons-vue'
const upload = ref<UploadInstance>();
const picclient = new PictureClient()
const showimg = ref(false)
const upheaders = ref({
    'Authorization': localStorage.getItem('MyBlogJwt') as string,
})
const action = ref('');
const routr = useRoute()
const removepic: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    return true;
}
const preview: UploadProps['onPreview'] = (uploadFile) => {
    clickimag.value = uploadFile.url!
    showimgdialog.value = true
}
const clickimag = ref('')
const showimgdialog = ref(false)
const uppiclist = ref<UploadUserFile[]>([])
const files = reactive<string[]>([])
onBeforeMount(() => {
    const id = routr.params.id as unknown as number
    picclient.getPicGroup(id).then(res => {
        res.forEach(id => {
            picclient.getByPicId(id).then(res => {
                files.push(URL.createObjectURL(res.data))
            })
        })
    })
    showimg.value = true

})
</script>
    
<style scoped>
.v-images-wrap {
    z-index: 999;
}

.uparea {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    margin-bottom: 20px;
}

.images {
    display: flex;
    flex-wrap: wrap;
}

.v-images-wrap {
    z-index: 9999;
    height: 80vh;
}
</style>
<style>
.v-images-wrap .img-container {
    z-index: 9999;
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    text-align: center;
}
</style>
    