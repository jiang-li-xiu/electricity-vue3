<!--
 * @Descripttion: 评价组件
 * @Author: JLX
 * @Date: 2022-08-12 11:33:00
 * @LastEditors: JLX
 * @LastEditTime: 2022-08-12 16:40:23
-->
<template>
  <div class="goods-comment" v-if="commentInfo">
    <!-- 评价头部 -->
    <div class="head">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }} </span>
          <span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span>
          <span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            v-for="(item, index) in commentInfo.tags"
            :key="item.title"
            href="javascript:;"
            :class="{ active: currentTagIndex === index }"
            @click="changeTag(index)"
            >{{ item.title }}（{{ item.tagCount }}）</a
          >
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a
        :class="{ active: reqParams.sortField === null }"
        @click="reqParams.sortField == null"
        href="javascript:;"
        >默认
      </a>
      <a
        :class="{ active: reqParams.sortField === 'createTime' }"
        @click="reqParams.sortField = 'createTime'"
        href="javascript:;"
        >最新
      </a>
      <a
        :class="{ active: reqParams.sortField === 'praiseCount' }"
        @click="reqParams.sortField = 'praiseCount'"
        href="javascript:;"
        >最热
      </a>
    </div>

    <!-- 评价列表 -->
    <div class="list">
      <div class="item">
        <div class="user">
          <!-- 头像 -->
          <img
            src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/avatar_1.png"
            alt=""
          />
          <!-- 名称 -->
          <span>兔****m</span>
        </div>
        <div class="body">
          <div class="score">
            <!-- 星星 -->
            <i class="iconfont icon-pingjia"></i>
            <i class="iconfont icon-pingjia"></i>
            <i class="iconfont icon-pingjia"></i>
            <i class="iconfont icon-pingjia"></i>
            <i class="iconfont icon-wjx02"></i>
            <span class="attr">颜色：黑色 尺码：M</span>
          </div>
          <div class="text">
            网易云app上这款耳机非常不错 新人下载网易云购买这款耳机优惠大
            而且耳机🎧确实正品 音质特别好 戴上这款耳机
            听音乐看电影效果声音真是太棒了 无线方便 小盒自动充电
            最主要是质量好音质棒 想要买耳机的放心拍 音效巴巴滴 老棒了
          </div>
          <div class="time">
            <span>2020-10-10 10:11:22</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i>100</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// API
import { findGoodsCommentInfo } from "@/api/product";
import { inject, reactive, ref } from "vue";
export default {
  name: "GoodsComment",
  setup() {
    // 获取评价信息
    const commentInfo = ref(null);
    // 从传进来的goods拿id
    const goods = inject("goods");
    findGoodsCommentInfo(goods.value.id).then((data) => {
      data.result.tags.unshift({
        title: "有图",
        tagCount: data.result.hasPictureCount,
        type: "img",
      });
      data.result.tags.unshift({
        title: "全部评价",
        tagCount: data.result.evaluateCount,
        type: "all",
      });
      // 设置数据之前 tags数组前追加 有图tag 全部评价tag 数据
      commentInfo.value = data.result;
      console.log(commentInfo);
    });

    // 激活tag 默认激活全部
    const currentTagIndex = ref(0);
    const changeTag = (i) => {
      currentTagIndex.value = i;
      // 点击tag时候修改筛选条件 当前点击的
      const tag = commentInfo.value.tags[i];
      // console.log(tag);
      // 情况一：全部评价
      // 情况二：有图
      // 情况三：正常tag
      if (tag.type === "all") {
        // 啥条件都不传 查询全部
        reqParams.hasPicture = null;
        reqParams.tag = null;
      }
      // 查询图片
      else if (tag.type === "img") {
        reqParams.hasPicture = true;
        reqParams.tag = null;
      }
      // 选择其他标签情况
      else {
        reqParams.hasPicture = null;
        reqParams.tag = tag.title;
      }
    };

    // 准备筛选条件数据
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null, //是否有图
      tag: null, //标签名
      sortField: null, //排序方式：praiseCount热度  createTime最新
    });

    console.log(reqParams);

    return {
      goods,
      commentInfo,
      currentTagIndex,
      changeTag,
      reqParams,
    };
  },
};
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }

  // 列表数据
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
