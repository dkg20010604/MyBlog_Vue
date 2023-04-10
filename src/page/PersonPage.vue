<template>
    <el-row class="boder" :gutter="20">
        <el-col :span="6" :offset="4">
            <el-card shadow="hover" :body-style="{ padding: '20px' }">
                <div class="cardbody">
                    <div class="bodyicon">
                        <notebook-one theme="two-tone" size="60" :fill="['#929292', '#ee410c']" :strokeWidth="3" />
                    </div>
                    <div class="bodyinfo">
                        <span class="infoname">文章量</span>
                        <span class="infonumber">{{ numb[0] }}</span>
                    </div>
                </div>
            </el-card>

        </el-col>
        <el-col :span="6" :offset="4">
            <el-card shadow="hover" :body-style="{ padding: '20px' }">
                <div class="cardbody">
                    <div class="bodyicon">
                        <topic theme="two-tone" size="60" :fill="['#929292', '#ee410c']" :strokeWidth="2" />
                    </div>
                    <div class="bodyinfo">
                        <span class="infoname">评论量</span>
                        <span class="infonumber">{{ numb[1] }}</span>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
    <el-row class="boder" :gutter="20">
        <el-col :span="15" :offset="0">
            <el-card shadow="hover" :body-style="{ padding: '20px' }">
                <div id="viewnumbercharts" class="charts">

                </div>
            </el-card>

        </el-col>
        <el-col :span="6" :offset="1">
            <el-card shadow="hover" :body-style="{ padding: '20px' }">
                <div id="typelistcharts" class="charts">

                </div>
            </el-card>

        </el-col>
    </el-row>
</template>
<script lang="ts" setup>
import { SignalR } from '@/stores/SignalR'
import * as echarts from 'echarts';
import { NotebookOne, Topic } from '@icon-park/vue-next'
import type { EChartsType } from 'echarts';
import { UserClient } from '@/controller'
import { useRouter } from 'vue-router';
const signalr = SignalR().conn;
const viewoption = {
    title: {
        text: '您最受欢迎的文章'
    },
    xAxis: {
        type: 'category',
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '标签',
            emphasis: {
                label:
                {
                    show: true,
                    fontSize: 20,
                }
            },
            labelLine: {
                show: true
            },
            data: [],
            type: 'bar'
        }
    ]
}
const goodoption = {
    title: {
        text: '您最擅长的领域',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    series: [
        {
            name: '标签',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 20,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [

            ]
        }
    ]
};
const userc = new UserClient();
const viewlist = ref<EChartsType>();
const typelist = ref<EChartsType>();
const numb = ref<number[]>([])
const getnum = async () => {
    const res = (await userc.getViewNumberArticle()).data
    let i = 0;
    res?.forEach(item => {
        if (i == 0) {
            for (let o in item) {
                viewoption.xAxis.data.push(o as never)
                viewoption.series[0].data.push(item[o] as never)
            }
        }
        else {
            for (let o in item) {
                goodoption.series[0].data.push({
                    value: item[o],
                    name: o
                } as never)
            }
        }
        i++;
    })
    viewlist.value = echarts.init(document.getElementById('viewnumbercharts') as HTMLElement);
    typelist.value = echarts.init(document.getElementById('typelistcharts') as HTMLElement);
    viewlist.value.setOption(viewoption)
    typelist.value.setOption(goodoption)

}
onBeforeMount(async () => {
    const res = ref()
    try {
        res.value = (await userc.getViewNumberArticle()).data
    } catch (error) {
        useRouter().replace('/401')
    }
    let i = 0;
    res.value?.forEach((item: { [x: string]: any; }) => {
        if (i == 0) {
            for (let o in item) {
                viewoption.xAxis.data.push(o as never)
                viewoption.series[0].data.push(item[o] as never)
            }
        }
        else {
            for (let o in item) {
                goodoption.series[0].data.push({
                    value: item[o],
                    name: o
                } as never)
            }
        }
        i++;
    })
    viewlist.value = echarts.init(document.getElementById('viewnumbercharts') as HTMLElement);
    typelist.value = echarts.init(document.getElementById('typelistcharts') as HTMLElement);
    viewlist.value.setOption(viewoption)
    typelist.value.setOption(goodoption)
    numb.value = (await userc.getArsComms()).data as number[]

})

onMounted(() => {
    signalr.on('view', async () => getnum)
})
</script>
<style scoped>
.boder {
    display: flex;
    justify-items: center;
    align-items: center;
    padding: 20px;
    width: 100%;
}

.cardbody {
    display: flex;
}

.bodyinfo {
    padding: 5px;
    display: grid;
    margin: auto;
}

.bodyinfo span {
    margin: auto;
    margin-top: 0;
}

.infoname {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 20px;
    margin-top: -10px;
}

.infonumber {
    font-size: 24px;

}

.charts {
    height: 250px;
}
</style>