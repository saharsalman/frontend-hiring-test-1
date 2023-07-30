export interface LoginApiBodyType {
    username: string;
    password: string;
}

export interface TableDataType {
    nodes: [{
        id: string;
        duration: number;
        is_archived: boolean;
        from: string;
        to: string;
        direction: string;
        call_type: string;
        via: string;
        created_at: string;
        notes?: [];
    }];
    hasNextPage: boolean;
    totalCount: number

}

export type AddNotesDialogPropsType = {
    onClose: any;
    isDialogOpen: boolean;
    id: string;
}

export interface TechnologyDataType {
    id: string;
    duration: number;
    is_archived: boolean;
    from: string;
    to: string;
    direction: string;
    call_type: string;
    via: string;
    created_at: string;
    notes?: [];
}

export type PaginationWrapperPropsType = {
    setOffset: any;
    totalPages: number;
}