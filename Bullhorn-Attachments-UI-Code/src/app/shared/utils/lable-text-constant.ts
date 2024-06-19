//Setup Placement-Repository Data Table

export const Setup_PlacementRepository_Main = [    
    { field: 'atsPlacementId', header:'workerInfoLabel.placementId' },
    { field: 'workerName', header: 'placementRepoComponentLevel.advanceSearch.workerName' },  
];
export const Setup_PlacementRepository = [   
    { field: 'legalEmployer', header: 'workerRelationshipLabels.legalEmployer' },
    { field: 'customerName', header: 'placementRepoComponentLevel.advanceSearch.customerNameAccountDropdownLabel', width:"15rem" },
    { field: 'supplierName', header: 'placementRepoComponentLevel.advanceSearch.supplierNameDropdownLabel' },
    { field: 'serviceLine', header: 'placementRepoComponentLevel.advanceSearch.lineOfBusinessDropdownLabel' },
    // { field: 'branch', header: 'Branch' },
    { field: 'personType', header: 'workerSearchComponent.advanceSearch.personType' },
    { field: 'targetStartDate', header: 'assignmentLabel.targetStartDate' },
    { field: 'consultantPointOfContact', header: 'workerSearchComponent.advanceSearch.cESEES' },
    { field: 'placementReviewStatus', header: 'workerInfoLabel.placementStatus' },
    { field: 'financeReviewStatus', header: 'placementRepoComponentLevel.advanceSearch.financeReviewStatusDropdownLabel' },
    { field: 'financeReviewerComments', header: 'placementRepoComponentLevel.advanceSearch.financeReviewerComments', width:"15rem" },
    { field: 'reviewedBy', header: 'placementRepoComponentLevel.advanceSearch.reviewedBy' },
    { field: 'reviewedDate', header: 'placementRepoComponentLevel.advanceSearch.reviewedDate' },
    { field: 'updatedBy', header: 'placementRepoComponentLevel.advanceSearch.updatedBy' },
    { field: 'updatedDate', header: 'placementRepoComponentLevel.advanceSearch.updatedDate' },
    //{ field: 'actions', header: 'placementRepoComponentLevel.advanceSearch.actions' }
];

//Setup Worker-Search Data Table
export const Setup_WorkerSearch_Main = [
    { field: 'fusionAssignmentId', header: 'hcmIdentifierLabels.fusionAssignID' },
    { field: 'fusionEmployeeId', header: 'hcmIdentifierLabels.fusionEmpID' },
];
export const Setup_WorkerSearch = [
    { field: 'placementId', header: 'workerInfoLabel.placementId' },  
	//{ field: 'personId', header: 'workerSearchComponent.advanceSearch.personId'},
	//{ field: 'assignmentId', header: 'workerSearchComponent.advanceSearch.assignmentId'},
    { field: 'workerName', header: 'workerSearchComponent.advanceSearch.workerName' },
    { field: 'legalEmployer', header: 'workerRelationshipLabels.legalEmployer' },
    { field: 'personType', header: 'workerSearchComponent.advanceSearch.personType' },
    { field: 'fusionCustomerName', header: 'workerSearchComponent.advanceSearch.customerNameAccount', width:"15rem" },
    { field: 'assignmentStatus', header: 'empDashboardLabels.assignmentStatus' },
    { field: 'employmentStatus', header: 'empDashboardLabels.emplstatus' },
    { field: 'consultantPointOfContact', header: 'workerSearchComponent.advanceSearch.cESEES' },
    { field: 'workState', header: 'benefitLabel.workState' },
    { field: 'reviewedBy', header: 'workerSearchComponent.advanceSearch.reviewedBy' },
	//{ field: 'effectiveEndDate', header: 'workerSearchComponent.advanceSearch.effectiveEndDate'},
];

export const Action_All = [
    { field: 'actions', header: 'workerSearchComponent.advanceSearch.actions' }
];

export const OnHold_Reason = [
    { field: 'reason', header: 'changeStatusLabels.holdReason' }
];
export const Setup_StatusHistory = [
    { field: 'placementId', header: 'workerInfoLabel.placementId' },
    { field: 'placementStatus', header: 'placementRepoComponentLevel.advanceSearch.placementStatusDropdownLabel' },
    { field: 'updateByName', header: 'placementRepoComponentLevel.advanceSearch.updatedBy' },
    { field: 'updatedOn', header: 'placementRepoComponentLevel.advanceSearch.updatedDate' },
    { field: 'reason', header: 'changeStatusLabels.reason' },
    { field: 'comments', header: 'changeStatusLabels.comments' }
];

export const Status_Icon_Labels = {
    Preview : 'preview',
    StatusHistory: 'status-history',
    InitiateReview: 'initiate-review',
    Review : `review`,
    OnHold : `on-hold`,
    ChangeHistory: 'Change-history',
    CancelPlacement: 'Cancel Placement'
}

//caf-loginModule-labelstxt.json
export const LOGIN_CONST = {
    key: {
        loginHead: 'Setup Portal',
        inputPlaceholder: 'Login Id',
        button: 'SIGN IN',
        browser: 'Browser support:',
        browser_crome: 'Chrome',
        version: '(Ver>= 51)',
        errorUnauthorized: 'Unauthorized: Access is denied due to Invalid Username. Please contact IT support team.'
    }
};


export const CSF_Dropdown = [
    { appFieldName: "text", appFieldCode: "Text" },
    { appFieldName: "dropdown", appFieldCode: "Dropdown" },
    { appFieldName: "checkbox", appFieldCode: "Radio button" }
];

//caf-rolesConfig.json
export const caf_rolesConfig = {
    roles: [
        {
            roleId: '1',
            workflows: [
                {
                    navigationUrl: 'home',
                    nextNavigationUrl: 'list',
                    prevNavigationUrl: '',
                    screen: 'Home',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'helpActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'dashboardSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'cafInitiationPendingSection',
                                    pageLocation: 'content',
                                    actionButtons: [
                                        {
                                            actionButton: '',
                                            actionButtonUrl: ''
                                        }
                                    ],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'exceptionSection',
                                    pageLocation: 'content',
                                    actionButtons: [
                                        {
                                            actionButton: '',
                                            actionButtonUrl: ''
                                        }
                                    ],
                                    AccesstionFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'cafStatusSection',
                                    pageLocation: 'content',
                                    actionButtons: [
                                        {
                                            actionButton: '',
                                            actionButtonUrl: ''
                                        }
                                    ],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },
                        {
                            sectionId: 'wouldLikeSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'list',
                    nextNavigationUrl: 'detail',
                    prevNavigationUrl: 'home',
                    screen: 'List',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'viewAllActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'homeActionBt',
                                    actionButtonUrl: 'home'
                                },
                                {
                                    actionButton: 'searchActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'workerSearchActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'cafListTableSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'detail',
                    nextNavigationUrl: '',
                    prevNavigationUrl: 'list',
                    screen: 'List',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'homeActionBt',
                                    actionButtonUrl: 'home'
                                },
                                {
                                    actionButton: 'repositoryActionBt',
                                    actionButtonUrl: 'list'
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'cafProgressSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'saveActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'initiateAssignmentActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'cancelCAFActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'reviewCompleteActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'bullHornSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'saveActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'initiateAssignmentActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'cancelCAFActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'reviewCompleteActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'detailsSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'workerSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'personalInfoSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'citizenNImmigrationSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'contactInfoSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'homeAddressSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },
                        {
                            sectionId: 'financeSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'customerProjectSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'organizationSegmentSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'supplierSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'wokerCompSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'clientContactSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'currencySection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },
                        {
                            sectionId: 'assignmentSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'benefitSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },

                        {
                            sectionId: 'acsTeamSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },

                        {
                            sectionId: 'additionalInformationSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'workers/workersearch',
                    nextNavigationUrl: '',
                    prevNavigationUrl: '',
                    screen: 'workerSearch',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'homeActionBt',
                                    actionButtonUrl: 'home'
                                },
                                {
                                    actionButton: 'repositoryActionBt',
                                    actionButtonUrl: 'list'
                                },
                                {
                                    actionButton: 'viewsActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'filterByStatusActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'selectColumnsActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'workers/workersearch/employmentinformation',
                    nextNavigationUrl: '',
                    prevNavigationUrl: '',
                    screen: 'employmentInformation',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'workerSearchActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                }
            ]
        },
        {
            roleId: '2',
            workflows: [
                {
                    navigationUrl: 'list',
                    nextNavigationUrl: 'detail',
                    prevNavigationUrl: '',
                    screen: 'List',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'searchActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'workerSearchActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'cafListTableSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'detail',
                    nextNavigationUrl: '',
                    prevNavigationUrl: 'list',
                    screen: 'detail',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'repositoryActionBt',
                                    actionButtonUrl: 'list'
                                },
                                {
                                    actionButton: 'saveActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'reviewCompleteActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'cafStatusSection',
                                    pageLocation: 'top',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },

                        {
                            sectionId: 'detailsSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'workerSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'personalInfoSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'citizenNImmigrationSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'contactInfoSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'homeAddressSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },
                        {
                            sectionId: 'financeSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'organizationSegmentSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },
                        {
                            sectionId: 'assignmentSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'equalEmpployeOpportunitySection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'acsTeamSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'workers/workersearch',
                    nextNavigationUrl: '',
                    prevNavigationUrl: '',
                    screen: 'workerSearch',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'repositoryActionBt',
                                    actionButtonUrl: 'list'
                                },
                                {
                                    actionButton: 'viewsActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'filterByStatusActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'selectColumnsActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'workers/workersearch/employmentinformation',
                    nextNavigationUrl: '',
                    prevNavigationUrl: '',
                    screen: 'employmentInformation',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'workerSearchActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                }
            ]
        },
        {
            roleId: '3',
            workflows: [
                {
                    navigationUrl: 'home',
                    nextNavigationUrl: 'list',
                    prevNavigationUrl: '',
                    screen: 'Home',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'helpActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'dashboardSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'cafInitiationPendingSection',
                                    pageLocation: 'content',
                                    actionButtons: [
                                        {
                                            actionButton: '',
                                            actionButtonUrl: ''
                                        }
                                    ],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'exceptionSection',
                                    pageLocation: 'content',
                                    actionButtons: [
                                        {
                                            actionButton: '',
                                            actionButtonUrl: ''
                                        }
                                    ],
                                    AccesstionFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'cafStatusSection',
                                    pageLocation: 'content',
                                    actionButtons: [
                                        {
                                            actionButton: '',
                                            actionButtonUrl: ''
                                        }
                                    ],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },
                        {
                            sectionId: 'wouldLikeSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },

                {
                    navigationUrl: 'list',
                    nextNavigationUrl: 'detail',
                    prevNavigationUrl: 'home',
                    screen: 'List',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'viewAllActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'homeActionBt',
                                    actionButtonUrl: 'home'
                                },
                                {
                                    actionButton: 'searchActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'workerSearchActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'cafListTableSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'detail',
                    nextNavigationUrl: '',
                    prevNavigationUrl: 'list',
                    screen: 'Detail',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'homeActionBt',
                                    actionButtonUrl: 'home'
                                },
                                {
                                    actionButton: 'repositoryActionBt',
                                    actionButtonUrl: 'list'
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'cafProgressSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'saveActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'initiateAssignmentActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'cancelCAFActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'reviewCompleteActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'bullHornSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'saveActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'initiateAssignmentActionBt',
                                    actionButtonUrl: ''
                                },

                                {
                                    actionButton: 'reviewCompleteActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'detailsSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'workerSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'personalInfoSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'citizenNImmigrationSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'contactInfoSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'homeAddressSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },
                        {
                            sectionId: 'financeSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'customerProjectSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'organizationSegmentSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'supplierSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'wokerCompSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'clientContactSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'currencySection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },
                        {
                            sectionId: 'assignmentSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'benefitSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },

                        {
                            sectionId: 'acsTeamSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'additionalInformationSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'workers/workersearch',
                    nextNavigationUrl: '',
                    prevNavigationUrl: '',
                    screen: 'workerSearch',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'homeActionBt',
                                    actionButtonUrl: 'home'
                                },
                                {
                                    actionButton: 'repositoryActionBt',
                                    actionButtonUrl: 'list'
                                },
                                {
                                    actionButton: 'viewsActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'filterByStatusActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'selectColumnsActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'workers/workersearch/employmentinformation',
                    nextNavigationUrl: '',
                    prevNavigationUrl: '',
                    screen: 'employmentInformation',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'workerSearchActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                }
            ]
        },
        {
            roleId: '4',
            workflows: [
                {
                    navigationUrl: 'workers/workersearch',
                    nextNavigationUrl: '',
                    prevNavigationUrl: '',
                    screen: 'workerSearch',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'viewsActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'filterByStatusActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'selectColumnsActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'workers/workersearch/employmentinformation',
                    nextNavigationUrl: '',
                    prevNavigationUrl: '',
                    screen: 'employmentInformation',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'workerSearchActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                }
            ]
        },
        {
            roleId: '6',
            workflows: [
                {
                    navigationUrl: 'home',
                    nextNavigationUrl: 'list',
                    prevNavigationUrl: '',
                    screen: 'Home',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'helpActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'dashboardSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'cafInitiationPendingSection',
                                    pageLocation: 'content',
                                    actionButtons: [
                                        {
                                            actionButton: '',
                                            actionButtonUrl: ''
                                        }
                                    ],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'exceptionSection',
                                    pageLocation: 'content',
                                    actionButtons: [
                                        {
                                            actionButton: '',
                                            actionButtonUrl: ''
                                        }
                                    ],
                                    AccesstionFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'cafStatusSection',
                                    pageLocation: 'content',
                                    actionButtons: [
                                        {
                                            actionButton: '',
                                            actionButtonUrl: ''
                                        }
                                    ],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },
                        {
                            sectionId: 'wouldLikeSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },

                {
                    navigationUrl: 'list',
                    nextNavigationUrl: 'detail',
                    prevNavigationUrl: 'home',
                    screen: 'List',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'viewAllActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'homeActionBt',
                                    actionButtonUrl: 'home'
                                },
                                {
                                    actionButton: 'searchActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'workerSearchActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'cafListTableSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'detail',
                    nextNavigationUrl: '',
                    prevNavigationUrl: 'list',
                    screen: 'Detail',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'homeActionBt',
                                    actionButtonUrl: 'home'
                                },
                                {
                                    actionButton: 'repositoryActionBt',
                                    actionButtonUrl: 'list'
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'cafProgressSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'saveActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'initiateAssignmentActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'cancelCAFActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'reviewCompleteActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'bullHornSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'saveActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'initiateAssignmentActionBt',
                                    actionButtonUrl: ''
                                },

                                {
                                    actionButton: 'reviewCompleteActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'detailsSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'workerSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'personalInfoSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'citizenNImmigrationSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'contactInfoSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'homeAddressSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },
                        {
                            sectionId: 'financeSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'customerProjectSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'organizationSegmentSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'supplierSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'wokerCompSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'clientContactSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'currencySection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },
                        {
                            sectionId: 'assignmentSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'benefitSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },

                        {
                            sectionId: 'acsTeamSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'additionalInformationSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'workers/workersearch',
                    nextNavigationUrl: '',
                    prevNavigationUrl: '',
                    screen: 'workerSearch',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'homeActionBt',
                                    actionButtonUrl: 'home'
                                },
                                {
                                    actionButton: 'repositoryActionBt',
                                    actionButtonUrl: 'list'
                                },
                                {
                                    actionButton: 'viewsActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'filterByStatusActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'selectColumnsActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'workers/workersearch/employmentinformation',
                    nextNavigationUrl: '',
                    prevNavigationUrl: '',
                    screen: 'employmentInformation',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'workerSearchActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                }
            ]
        },
        {
            roleId: '7',
            workflows: [
                {
                    navigationUrl: 'home',
                    nextNavigationUrl: 'list',
                    prevNavigationUrl: '',
                    screen: 'Home',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'helpActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'dashboardSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'cafInitiationPendingSection',
                                    pageLocation: 'content',
                                    actionButtons: [
                                        {
                                            actionButton: '',
                                            actionButtonUrl: ''
                                        }
                                    ],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'exceptionSection',
                                    pageLocation: 'content',
                                    actionButtons: [
                                        {
                                            actionButton: '',
                                            actionButtonUrl: ''
                                        }
                                    ],
                                    AccesstionFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'cafStatusSection',
                                    pageLocation: 'content',
                                    actionButtons: [
                                        {
                                            actionButton: '',
                                            actionButtonUrl: ''
                                        }
                                    ],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },
                        {
                            sectionId: 'wouldLikeSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },

                {
                    navigationUrl: 'list',
                    nextNavigationUrl: 'detail',
                    prevNavigationUrl: 'home',
                    screen: 'List',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'viewAllActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'homeActionBt',
                                    actionButtonUrl: 'home'
                                },
                                {
                                    actionButton: 'searchActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'workerSearchActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'cafListTableSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'detail',
                    nextNavigationUrl: '',
                    prevNavigationUrl: 'list',
                    screen: 'Detail',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'homeActionBt',
                                    actionButtonUrl: 'home'
                                },
                                {
                                    actionButton: 'repositoryActionBt',
                                    actionButtonUrl: 'list'
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'cafProgressSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'saveActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'initiateAssignmentActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'cancelCAFActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'reviewCompleteActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'bullHornSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'saveActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'initiateAssignmentActionBt',
                                    actionButtonUrl: ''
                                },

                                {
                                    actionButton: 'reviewCompleteActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'detailsSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'workerSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'personalInfoSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'citizenNImmigrationSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'contactInfoSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'homeAddressSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },
                        {
                            sectionId: 'financeSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'customerProjectSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'organizationSegmentSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'supplierSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'wokerCompSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'clientContactSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'currencySection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },
                        {
                            sectionId: 'assignmentSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'benefitSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },

                        {
                            sectionId: 'acsTeamSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'additionalInformationSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'workers/workersearch',
                    nextNavigationUrl: '',
                    prevNavigationUrl: '',
                    screen: 'workerSearch',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'homeActionBt',
                                    actionButtonUrl: 'home'
                                },
                                {
                                    actionButton: 'repositoryActionBt',
                                    actionButtonUrl: 'list'
                                },
                                {
                                    actionButton: 'viewsActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'filterByStatusActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'selectColumnsActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'workers/workersearch/employmentinformation',
                    nextNavigationUrl: '',
                    prevNavigationUrl: '',
                    screen: 'employmentInformation',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'workerSearchActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                }
            ]
        },
        {
            roleId: '8',
            workflows: [
                {
                    navigationUrl: 'home',
                    nextNavigationUrl: 'list',
                    prevNavigationUrl: '',
                    screen: 'Home',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'helpActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'dashboardSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'cafInitiationPendingSection',
                                    pageLocation: 'content',
                                    actionButtons: [
                                        {
                                            actionButton: '',
                                            actionButtonUrl: ''
                                        }
                                    ],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'exceptionSection',
                                    pageLocation: 'content',
                                    actionButtons: [
                                        {
                                            actionButton: '',
                                            actionButtonUrl: ''
                                        }
                                    ],
                                    AccesstionFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'cafStatusSection',
                                    pageLocation: 'content',
                                    actionButtons: [
                                        {
                                            actionButton: '',
                                            actionButtonUrl: ''
                                        }
                                    ],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },
                        {
                            sectionId: 'wouldLikeSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },

                {
                    navigationUrl: 'list',
                    nextNavigationUrl: 'detail',
                    prevNavigationUrl: 'home',
                    screen: 'List',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'viewAllActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'homeActionBt',
                                    actionButtonUrl: 'home'
                                },
                                {
                                    actionButton: 'searchActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'workerSearchActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'cafListTableSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'detail',
                    nextNavigationUrl: '',
                    prevNavigationUrl: 'list',
                    screen: 'Detail',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'homeActionBt',
                                    actionButtonUrl: 'home'
                                },
                                {
                                    actionButton: 'repositoryActionBt',
                                    actionButtonUrl: 'list'
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'cafProgressSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'saveActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'initiateAssignmentActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'cancelCAFActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'reviewCompleteActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'bullHornSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'saveActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'initiateAssignmentActionBt',
                                    actionButtonUrl: ''
                                },

                                {
                                    actionButton: 'reviewCompleteActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'detailsSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'workerSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'personalInfoSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'citizenNImmigrationSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'contactInfoSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'homeAddressSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },
                        {
                            sectionId: 'financeSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: [
                                {
                                    sectionId: 'customerProjectSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'organizationSegmentSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'supplierSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'wokerCompSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'clientContactSection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                },
                                {
                                    sectionId: 'currencySection',
                                    pageLocation: 'content',
                                    actionButtons: [],
                                    AccesstoFields: [],
                                    subSections: []
                                }
                            ]
                        },
                        {
                            sectionId: 'assignmentSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'benefitSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },

                        {
                            sectionId: 'acsTeamSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        },
                        {
                            sectionId: 'additionalInformationSection',
                            pageLocation: 'content',
                            actionButtons: [],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'workers/workersearch',
                    nextNavigationUrl: '',
                    prevNavigationUrl: '',
                    screen: 'workerSearch',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'homeActionBt',
                                    actionButtonUrl: 'home'
                                },
                                {
                                    actionButton: 'repositoryActionBt',
                                    actionButtonUrl: 'list'
                                },
                                {
                                    actionButton: 'viewsActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'filterByStatusActionBt',
                                    actionButtonUrl: ''
                                },
                                {
                                    actionButton: 'selectColumnsActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                },
                {
                    navigationUrl: 'workers/workersearch/employmentinformation',
                    nextNavigationUrl: '',
                    prevNavigationUrl: '',
                    screen: 'employmentInformation',
                    sections: [
                        {
                            sectionId: 'titleSection',
                            pageLocation: 'top',
                            actionButtons: [
                                {
                                    actionButton: 'workerSearchActionBt',
                                    actionButtonUrl: ''
                                }
                            ],
                            AccesstoFields: [],
                            subSections: []
                        }
                    ]
                }
            ]
        }
    ]
};

export const change_history = [
    { field: 'modifiedDate', header: 'changehistoryLabels.change&Date' },
    { field: 'placementId', header: 'workerInfoLabel.placementId' },
    { field: 'labelName', header: 'changehistoryLabels.fieldName' },
    { field: 'oldValue', header: 'changehistoryLabels.oldValue' },
    { field: 'newValue', header: 'changehistoryLabels.newValue' },
    { field: 'modifiedByName', header: 'placementRepoComponentLevel.advanceSearch.updatedBy' },
    // { field: 'caseId', header: 'changehistoryLabels.caseId' },
];
// headerTranslation(translateKey: string) {
//     return this.translateService.translateHeader(translateKey);

//     }
export const assignment_information = [
    { field: 'hcmAssignmentId', header: 'hcmIdentifierLabels.fusionAssignID'},
    { field: 'customerName', header: 'workerInfoLabel.placementId' },
    { field: 'fusionCustomerAccountName', header: 'customerLabels.fusionCustomerName(acc)' },
    { field: 'project', header: 'projectDeliveryLabels.project' },
    { field: 'jobTitle', header: 'assignmentLabel.jobTitle' },
    { field: 'targetStartDate', header: 'assignmentLabel.targetStartDate' },
    // { field: 'targetEndDate', header: 'assignmentLabel.targetEndDate' },
    { field: 'actualStartDate', header: 'assignmentLabel.actualStartDateAsnm' },
    { field: 'actualEndDate', header: 'assignmentLabel.actualEndDateAsnm' },
    // { field: 'suspendDate', header: 'assignmentLabel.plannedActive/SuspendDate' },
    // { field: 'plannedEndDate', header: 'assignmentLabel.plannedEndDate' },
    { field: 'assignmentStatus', header: 'empDashboardLabels.assignmentStatus' },
    { field: 'standardPayRate', header: 'payBillLabel.standardPayRate' },
    { field: 'standardBillRate', header: 'payBillLabel.standardbillrate' },
    // { field: 'workState', header: 'benefitLabel.workState' },
    { field: 'createdBy', header: 'Created By' },
    { field: 'createdOn', header: 'Created On' },
    { field: 'updatedBy', header: 'Updated By' },
    { field: 'updatedOn', header: 'Updated On' },
    { field: 'actions', header: 'placementRepoComponentLevel.advanceSearch.actions' }
];