/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit ArkData
 */
/**
 * Indicates the common data types.
 *
 * @namespace commonType
 * @syscap SystemCapability.DistributedDataManager.CommonType
 * @crossplatform
 * @since 11
 */
declare namespace commonType {
    /**
     * Describes the status of asset.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.CommonType
     * @crossplatform
     * @since 11
     */
    enum AssetStatus {
        /**
         * Means the status of asset is normal.
         *
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 11
         */
        ASSET_NORMAL,
        /**
         * Means the asset needs to be inserted.
         *
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 11
         */
        ASSET_INSERT,
        /**
         * Means the asset needs to be updated.
         *
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 11
         */
        ASSET_UPDATE,
        /**
         * Means the asset needs to be deleted.
         *
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 11
         */
        ASSET_DELETE,
        /**
         * Means the status of asset is abnormal.
         *
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 11
         */
        ASSET_ABNORMAL,
        /**
         * Means the status of asset is downloading.
         *
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 11
         */
        ASSET_DOWNLOADING
    }
    /**
     * Information of the asset.
     *
     * @interface Asset
     * @syscap SystemCapability.DistributedDataManager.CommonType
     * @crossplatform
     * @since 11
     */
    interface Asset {
        /**
         * The name of asset.
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 11
         */
        /**
         * The name of asset.
         * @type { string | undefined }
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 12
         */
        name: string | undefined;
        /**
         * The uri of asset.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 11
         */
        /**
         * The uri of asset.
         *
         * @type { string | undefined }
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 12
         */
        uri: string | undefined;
        /**
         * The path of asset.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 11
         */
        /**
         * The path of asset.
         *
         * @type { string | undefined }
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 12
         */
        path: string | undefined;
        /**
         * The created time of asset.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 11
         */
        /**
         * The created time of asset.
         *
         * @type { string | undefined }
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 12
         */
        createTime: string | undefined;
        /**
         * The modified time of asset. If this field changes, the asset is considered to have changed.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 11
         */
        /**
         * The modified time of asset. If this field changes, the asset is considered to have changed.
         *
         * @type { string | undefined }
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 12
         */
        modifyTime: string | undefined;
        /**
         * The size of asset. If this field changes, the asset is considered to have changed.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 11
         */
        /**
         * The size of asset. If this field changes, the asset is considered to have changed.
         *
         * @type { string | undefined }
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 12
         */
        size: string | undefined;
        /**
         * The status of asset.
         *
         * @type { ?AssetStatus }
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 11
         */
        /**
         * The status of asset.
         *
         * @type { ?(AssetStatus | undefined) }
         * @syscap SystemCapability.DistributedDataManager.CommonType
         * @crossplatform
         * @since 12
         */
        status?: AssetStatus | undefined;
    }
    /**
     * Indicates several assets
     *
     * @syscap SystemCapability.DistributedDataManager.CommonType
     * @crossplatform
     * @since 11
     */
    type Assets = Array<Asset>;
    /**
     * Indicates possible value types.
     *
     * @syscap SystemCapability.DistributedDataManager.CommonType
     * @crossplatform
     * @since 11
     */
    type ValueType = null | number | string | boolean | Uint8Array | Asset | Assets;
    /**
     * Values in buckets are stored in key-value pairs.
     *
     * @syscap SystemCapability.DistributedDataManager.CommonType
     * @crossplatform
     * @since 11
     */
    type ValuesBucket = Record<string, ValueType>;
}
export default commonType;
