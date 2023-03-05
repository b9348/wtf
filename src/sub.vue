<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { ElTable } from 'element-plus'


const btnList = ref([
  { tagName: "设置价格", num: '' },
  { tagName: "设置划线价", num: '' },
  { tagName: "设置成本价", num: '' },
  { tagName: "设置库存", num: '' },
  { tagName: "设置体积", num: '' },
  { tagName: "设置重量", num: '' },
  { tagName: "设置条码", num: '' },
])
onMounted(() => {
  form.value.push({
    name: "",
    body: ['']
  })
})

const bottomData = ref([
])
const form = ref([
  // {
  //   name: "",
  //   type: "规格值",
  //   add: "添加规格值",
  //   body: ['']
  // }, 
]);
const typeToData = (type) => {
  // 获取头部数组
  const head = type.map(({ name }) => name);

  // 递归函数
  const convert = (arr, index, obj) => {
    if (index === arr.length) {
      return [obj];
    }
    const { name, body } = arr[index];
    return body.reduce((result, value) => {
      const newObj = { ...obj, [name]: value };
      const output = convert(arr, index + 1, newObj);
      return [...result, ...output];
    }, []);
  };

  // 生成新的数据对象
  const newbody = convert(type, 0, {});
  return { head, newbody };
}
const viewData = computed(() => {
  return JSON.parse(JSON.stringify(form.value))
})
watch(viewData,
  (newData, oldData) => {
    // console.log('监听',JSON.parse(JSON.stringify(newData)), JSON.parse(JSON.stringify(oldData)));
    // 比较form前后差别，更新表格 
    bottomData.value = typeToData(form.value)
  }
)
const change = (i) => { };
const addBox = () => {
  form.value.push({
    name: '',
    body: ['']
  });
};
const addVal = (index) => {
  form.value[index].body.push('');
}
const removeInput = (item, idx, index) => { 
  form.value[index].body.filter(e => e == item) 
}
const atTheSameTime = (item, idx, index) => {
  //                    e 2 0 值，一行中的下标，规格中的顺序
  let n = JSON.parse(JSON.stringify(form.value))
  let count = n[index].body.reduce((acc, curr) => {
    if (curr == item && curr != '') {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  if (count > 1) {
    alert('repeat!')
    delete form.value[index].body[idx]
  }
} 
</script>

<template>
  <div class="wrapper">
    <div class="add">
      <el-button type="primary" @click="addBox()">
        添加规格向
      </el-button>
    </div>
    <div class="formList" v-for="(val, index) in form">
      <div class="newForm" :key="index">
        <el-form :model="form" class="formatName" label-width="120px">
          <el-form-item label="规格名">
          </el-form-item>
          <el-col :span="5">
            <el-input v-model="val.name" @change="change(item)" />
          </el-col>
        </el-form>
        <el-form :model="form" class="formatVal" label-width="120px">
          <el-form-item label="规格值" />
          <div class="valList">
            <div v-for="(item, idx) in val.body">
              <el-input closable @change="atTheSameTime(item, idx, index)" :key="val.body" v-model="val.body[idx]"
                class="hihihi" />
              <div @click="removeInput(item, idx, index)" class="qqqq">x</div>
            </div>
            <el-button @click="addVal(index)">
              +添加规格值
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="details">
      <div class="title">规格明细</div>
      <div class="richForm">
        <div class="titleList"></div>
        <div class="mainForm">
          <div class="up">
            <div class="tag" v-for="val in btnList">
              <el-button>{{ val.tagName }}</el-button>
            </div>
          </div>
          <div class="down">
            <el-table class="downTable" empty-text=" " :data="bottomData.newbody" stripe border style="width: 100%">
              <el-table-column type="selection" width="55" />
              <template v-for='(i, idx) in bottomData.head' :key="idx">
                <el-table-column :prop=i :label="i" />
              </template>
              <template v-for="(e, idx) in btnList">
                <el-table-column :label="e.tagName.slice(2)" />
              </template>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 1100px;
  position: relative;

  .add {
    position: fixed;
    left: 50px;
    top: 50px;
  }
}


.mainForm {
  display: flex;

  flex-direction: column
}

.details {
  display: flex;

  .title {
    width: 120px;
  }
}

.formatName {
  display: flex;

}

.formatVal {
  display: flex;
}

.valList {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  position: relative;

  .delBtn:hover {
    display: block;
  }

  .delBtn {
    width: 20px;
    height: 20px;
    display: block;
    background: #ccc;
    position: absolute;
    top: -9px;
    z-index: 99;
    left: 220px;
  }

  .qqqq {
    position: relative;
    top: -40px;
    right: -150px;
    display: block;
    background: #ccc;
    width: 20px;
    height: 20px;
  }


  .el-input {
    width: 160px;
    height: 30px;
    margin-right: 8px;
  }

}

.up {
  display: flex;

  .tag {
    margin-right: 8px
  }
}


.down {
  .downTable {
    width: 1000px;
  }
}
</style>
