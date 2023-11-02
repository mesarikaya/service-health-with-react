import { ComponentType } from "react";

export interface HistoricalLookback {
    plant: string,
    std_path: string,
    event_start_time_local: string,
    event_end_time_local: string,
    event_var_value: number,
    event_var_value_model_mdi: number,
    event_var_datatype: string,
    event_var_source_ref: string,
    event_var_value_pitag: string,
    event_var_name: string,
    quality_sample_point: string,
    rank: string
}

export interface ERPView {
    plant_location_pi: string,
    area_pi: string,
    special_grade_erp: string
    product_pi: string
    ip_nonip_pi: string
    product_origin_pi: string
    unadj_scale_volume_mt_pi: number
    odv_average_mt_pi: number
    best_dem_q3_cap_mt_pi: number
    best_dem_avg_mt_pi: number
    cd_volume_mt_pi: number
    planned_volume_mt_pi: number
    odv_set_point_metric_pi: number
    adj_actual_volume_processed_mt_cdp: number
}

export interface ThresholdTarget {
    plant: string,
    path: string,
    attribute_name: string,
    attribute_upper_threshold: number,
    attribute_target: number,
    attribute_lower_threshold: number,
    attribute_uom: string,
    rank: string
}

export interface IEvent {
    tucname: string,
    event_start_time_local: string,
    event_end_time_local: string,
    loss_in_local_uom: number,
    reason_ll_lvl06: string,
    reason_ll_lvl07: string,
    reason_ll_lvl04: string,
    reason_ll_lvl03: string,
    comment: string,
    event_type: string
}

export interface Loss {
    reason_ll_lvl06: string,
    unit_of_measurement: string,
    loss_in_local_uom: number,
}

export interface IDentList {
    dent_list_type: string,
    path: string,
    plant: string,
    time_stamp: string,
    status: string,
    metric: string,
    dent_description: string,
    impact: string,
    action: string,
    due: string,
    responsible: string
}

export interface INotification {
    event_id: string
    source_system: string
    created_by: string
    created_date: string
    updaed_by: string
    updated_date: string
    list_type: string
    path: string
    plant: string
    time_stamp: string
    title: string
    body: string
    entered_by: string
}

export interface TileMember {
    attribute: string,
    type: string,
    lookback24Hours: boolean,
    description: string,
    value: number
}

export interface TileSetup {
    attribute?: string,
    tile_value: any,
    tile_event: () => void,
    tile_members?: TileMember[]
}

export interface ModalSetup {
    modal_flag: boolean,
    modal_event: () => void,
}

export interface Attributes {
    attribute_target: number,
    attribute_lower_threshold: number,
    attribute_upper_threshold: number,
    attribute_uom: string
}

export interface LastDay {
    last_day_key: string,
    key: string, //TODO REMOVE
    sub_key: string,
    value: number,
    lookback24Hours : boolean
}

export interface Compliance {
    plant: string,
    time_stamp: string,
    compliance_name: string,
    compliance_value: number,
    compliance_uom: string
}

export interface Stock {
    plant: string,
    storage_id: string,
    storage_type: string,
    time_stamp: string,
    product_family: string,
    product_name: string,
    product_type: string,
    measured_value: number,
    product_uom: string,
}

export interface PermitCount {
    plant: string,
    permit_type: string,
    permit_count: number
   
}
export interface Permit {
    plant: string,
    permit_type: string,
    title: string,
    description: string,
    permit_number: string,
    responsible: string,
    start_date_time: string,
    end_date_time: string,
    status: string
}

export interface Cross {
    safety_cross_date: string,
    color: string
}

export interface HRT {
    hrttype: string,
    task: string,
    timestamp: string
}
export interface HRT_TASK {
    plant: string,
    task: string,
    process: string,
    responsible: string,
    time_stamp: string,
    hrt_type: string,
    path: string,
}
export interface EHS {
    event_id: string,
    source_system: string,
    plant: string,
    created_by: string,
    created_date: string,
    updated_date: string,
    updated_by: string,
    event_type: string,
    path: string,
    time_stamp: string,
    event_description: string,
    reported_by: string,
    color: string
}

export interface IPage {
    name: string,
    display? : boolean
}

export interface IDetail {
    handleClose: () => void;
}

export interface IRoute {
    path: string;
    name: string;
    icon?:ComponentType;
    exact: boolean;
    component?: any;
    props?: any;
    children?: any;
    permission?:any;
}