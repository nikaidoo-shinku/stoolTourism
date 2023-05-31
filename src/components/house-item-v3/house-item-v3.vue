<template>
    <div class="house-item">
        <div class="item-inner">
            <div class="cover">
                <img :src="itemData?.image?.url" alt="">
            </div>
            <div class="infos">
                <div class="location">
                    <img src="@/assets/img/home/location.png" alt="">
                    <span>{{ itemData.location }}</span>
                </div>
                <div class="summary">{{ itemData.summaryText }}</div>
                <div class="name">{{ itemData.houseName }}</div>
                <div class="price">
                    <div class="new">￥{{ itemData.finalPrice }}</div>
                    <div class="old">￥{{ itemData.productPrice }}</div>
                    <div class="tip" v-if="itemData.priceTipBadge">{{ itemData.priceTipBadge.text }}</div>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>

  defineProps({
    itemData: {
        type: Object,
        default: () => ({})
    }
  })

  </script>
  
  <style lang="less" scoped>
  .house-item {
    width: 50%;
    position: relative;
    .item-inner {
        margin: 5px;
        background: #fff;
        border-radius: 6px;
        overflow: hidden;
        .cover {
            img {
                width: 100%;
            }
        }
        .infos {
            position: absolute;
            top: 57%;
            padding: 8px 10px;
            color: #999999;

            .location {
                display: flex;
                align-items: center;
                position: absolute;
                top: -20%;
                img {
                    width: 20%;
                }
            }
            .summary {
                font-size: 12px;
                position: absolute;
                top: 85%;
            }
            .name {
                margin: 5px 0;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .price {
                display: flex;
                position: absolute;
                top: 95%;
                justify-content: space-between;
                margin-top: 10px;
                .new {
                    font-size: 17px;
                    color: #fcae3e;
                }
                .old {
                    color: #999999;
                    text-decoration: line-through;
                }
                .tip {
                    background-color: #e16766;
                    border-radius: 12px;
                    padding: 2px;
                    margin-left: 5px;
                    box-sizing: border-box;
                    color: #ffffff;
                }
            }
        }
    }
  }
  
  </style>