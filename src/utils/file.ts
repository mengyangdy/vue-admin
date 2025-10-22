import { request } from '@/service/request';
import { AxiosRequestConfig } from 'axios';

/**
 * 判断是否位外部URL
 * @param url URL地址
 * @returns boolean
 */
export function isExternalUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const currentOrigin = window.location.origin;
    return urlObj.origin !== currentOrigin;
  } catch {
    return true;
  }
}

export async function downloadFileFromUrl(url: string, filename?: string) {
  try {
    if (isExternalUrl(url)) {
      window.open(url, '_self');
    } else {
      // 对于内部API,使用axios
      const response = await request({
        url: url,
        method: 'get',
        responseType: 'blob',
      });
      const blob = response.data;
      const finalFilename = filename ?? getFilenameFromUrl(url);
      downloadBlob(blob, finalFilename);
    }
  } catch (error) {}
}

/**
 * 通用的下载函数
 * @param blob Blob对象
 * @param filename 文件名
 * @returns void
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename;
  link.setAttribute('target', '_blank');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
}

/**
 * 从url中提取文件名
 * @param url URL地址
 * @param fallback 默认文件名
 * @returns 文件名
 */
export function getFilenameFromUrl(url: string, fallback = 'download'): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = pathname.split('/').pop();
    return filename || fallback;
  } catch {
    return fallback;
  }
}

/**
 * url 转 base64
 */
export function urlToBase64(url: string, mineType?: string) {
  return new Promise<string>((resolve, reject) => {
    let canvas = document.createElement('canvas') as HTMLCanvasElement | null;
    const ctx = canvas?.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (!canvas || !ctx) {
        return reject(new Error('failed to create canvas.'));
      }
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const dataURL = canvas.toDataURL(mineType || 'image/png');
      canvas = null;
      resolve(dataURL);
    };
    img.onerror = () => {
      reject(new Error('failed to load image.'));
    };
    img.src = url;
  });
}

export function fetchBlobResponse<T = any>(
  url: string,
  axiosRequestConfig: AxiosRequestConfig = {},
) {
  return request({
    url: url,
    method: 'get',
    responseType: 'blob',
    ...axiosRequestConfig,
  });
}

/**
 * 下载图片
 * @param imageUrl 图片url
 * @param filename 文件名
 */
export async function downloadImage(imageUrl: string, filename?: string) {
  try {
    const base64 = await urlToBase64(imageUrl);
    const finalFilename = filename ?? getFilenameFromUrl(imageUrl);
    downloadBase64(base64, finalFilename, 'image/png');
  } catch (error) {}
}

/**
 * 下载文本内容
 * @param content 文本内容
 * @param filename 文件名
 * @param mimeType MIME类型
 */
export function downloadText(
  content: string,
  filename: 'download.txt',
  mimeType = 'text/plain;charset=utf-8',
) {
  const blob = new Blob([content], { type: mimeType });
  downloadBlob(blob, filename);
}

/**
 * 下载base64数据
 * @param base64Data base64字符串
 * @param filename 文件名
 * @param mimeType MIME类型
 */
export function downloadBase64(base64Data: string, filename = 'download', mimeType = 'image/png') {
  const base64 = base64Data.includes('base64,') ? base64Data.split('base64,')[1] : base64Data;
  const byteCharacters = atob(base64);
  const byteNumbers = Array.from({ length: byteCharacters.length }, (_, i) =>
    byteCharacters.charCodeAt(i),
  );
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });
  downloadBlob(blob, filename);
}
