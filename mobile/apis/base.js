import baseHttp from '../utils/http';

export default {
  /**
   * @description 检查用户登录态
   */
  checkLoginStatus() {
    return baseHttp.get(`/api/user/checkLoginStatus`);
  },

  /**
   * @description 获取短信验证码
   * @param {String} tel 手机号码
   * @param {String} imgCode 短信验证码
   */
  getCode(tel, imgCode) {
    return baseHttp.post(`/api/user/getCode`, { tel, imgCode });
  },

  /**
   * @description 手机号码登录
   * @param {String} tel 手机号
   * @param {String} code 验证码
   * @param {String} validDays 有效期
   */
  login(tel, code = '', validDays = 10) {
    return baseHttp.post(`/api/user/login`, {
      tel,
      code,
      validDays
    });
  },

  /**
   * @description 领取优惠券或券包
   * @param {*} param0
   */
  addCoupon({ id, isCouponParcel = 0, couponInfoShow = 1 }) {
    return baseHttp.post(`/api/coupon/addByUser`, { id, isCouponParcel, couponInfoShow });
  },

  // 获取腾讯云上传签名
  createUploadSign({
    fileName,
    path = '/iosjc/dev/',
    customPath = '/kl/',
    uploadWay = 'tencentUpload'
  }) {
    return baseHttp.post(
      `/api/upload/getSign?path=${path}&customPath=${customPath}&uploadWay=${uploadWay}&fileName=${fileName}`
    );
  }
};
