/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { h, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAsyncState } from '@vueuse/core'
import ButtonLink from '@/components/button-link'
import { queryProjectListPaging } from '@/service/modules/projects'
import { parseTime } from '@/common/common'
import { deleteProject } from '@/service/modules/projects'
import { format } from 'date-fns'
import { useRouter } from 'vue-router'
import {
  NButton,
  NEllipsis,
  NIcon,
  NPopconfirm,
  NSpace,
  NTooltip
} from 'naive-ui'
import {
  COLUMN_WIDTH_CONFIG,
  calculateTableWidth,
  DefaultTableWidth
} from '@/common/column-width-config'
import type { Router } from 'vue-router'
import type { ProjectRes } from '@/service/modules/projects/types'
import { ControlOutlined, DeleteOutlined, EditOutlined } from '@vicons/antd'
import { useUserStore } from '@/store/user/user'
import { UserInfoRes } from '@/service/modules/users/types'

export function useTable() {
  const { t } = useI18n()
  const router: Router = useRouter()

  const userStore = useUserStore()
  const userInfo = userStore.getUserInfo as UserInfoRes
  const IS_ADMIN = userInfo.userType === 'ADMIN_USER'

  const handleEdit = (row: any) => {
    variables.showModalRef = true
    variables.statusRef = 1
    variables.row = row
  }

  const handleAssign = (row: any) => {
    variables.showWorkerGroupModalRef = true
    variables.row = row
  }

  const handleDelete = (row: any) => {
    deleteProject(row.code).then(() => {
      getTableData({
        pageSize: variables.pageSize,
        pageNo:
          variables.tableData.length === 1 && variables.page > 1
            ? variables.page - 1
            : variables.page,
        searchVal: variables.searchVal
      })
    })
  }

  const createColumns = (variables: any) => {
    variables.columns = [
      {
        title: '#',
        key: 'index',
        render: (unused: any, index: number) => index + 1,
        ...COLUMN_WIDTH_CONFIG['index']
      },
      {
        title: t('project.list.project_name'),
        key: 'name',
        className: 'project-name',
        ...COLUMN_WIDTH_CONFIG['linkName'],
        render: (row: { code: string; name: any }) =>
          h(
            ButtonLink,
            {
              onClick: () => {
                router.push({
                  path: `/projects/${row.code}`,
                  query: { projectName: row.name }
                })
              }
            },
            {
              default: () =>
                h(
                  NEllipsis,
                  COLUMN_WIDTH_CONFIG['linkEllipsis'],
                  () => row.name
                )
            }
          )
      },
      {
        title: t('project.list.owned_users'),
        key: 'userName',
        ...COLUMN_WIDTH_CONFIG['userName']
      },
      {
        title: t('project.list.workflow_define_count'),
        key: 'defCount',
        width: 120,
        ellipsis: {
          tooltip: true
        }
      },
      {
        title: t('project.list.description'),
        key: 'description',
        ...COLUMN_WIDTH_CONFIG['note']
      },
      {
        title: t('project.list.create_time'),
        key: 'createTime',
        ...COLUMN_WIDTH_CONFIG['time']
      },
      {
        title: t('project.list.update_time'),
        key: 'updateTime',
        ...COLUMN_WIDTH_CONFIG['time']
      },
      {
        title: t('project.list.operation'),
        key: 'actions',
        ...COLUMN_WIDTH_CONFIG['operation'](3),
        render(row: any) {
          return h(NSpace, null, {
            default: () => [
              h(
                NTooltip,
                {},
                {
                  trigger: () =>
                    h(
                      NButton,
                      {
                        circle: true,
                        type: 'info',
                        size: 'small',
                        class: 'edit',
                        onClick: () => {
                          handleEdit(row)
                        }
                      },
                      {
                        icon: () =>
                          h(NIcon, null, { default: () => h(EditOutlined) })
                      }
                    ),
                  default: () => t('project.list.edit')
                }
              ),
              IS_ADMIN &&
                h(
                  NTooltip,
                  {
                    trigger: 'hover'
                  },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          circle: true,
                          type: 'info',
                          size: 'small',
                          class: 'edit',
                          onClick: () => {
                            handleAssign(row)
                          }
                        },
                        {
                          icon: () => h(NIcon, null, () => h(ControlOutlined))
                        }
                      ),
                    default: () => t('project.list.assign_worker_group')
                  }
                ),
              h(
                NPopconfirm,
                {
                  onPositiveClick: () => {
                    handleDelete(row)
                  }
                },
                {
                  trigger: () =>
                    h(
                      NTooltip,
                      {},
                      {
                        trigger: () =>
                          h(
                            NButton,
                            {
                              circle: true,
                              type: 'error',
                              size: 'small',
                              class: 'delete'
                            },
                            {
                              icon: () =>
                                h(NIcon, null, {
                                  default: () => h(DeleteOutlined)
                                })
                            }
                          ),
                        default: () => t('project.list.delete')
                      }
                    ),
                  default: () => t('project.list.delete_confirm')
                }
              )
            ]
          })
        }
      }
    ]
    if (variables.tableWidth) {
      variables.tableWidth = calculateTableWidth(variables.columns)
    }
  }

  const variables = reactive({
    columns: [],
    tableWidth: DefaultTableWidth,
    tableData: [],
    page: ref(1),
    pageSize: ref(10),
    searchVal: ref(''),
    totalPage: ref(1),
    showModalRef: ref(false),
    showWorkerGroupModalRef: ref(false),
    statusRef: ref(0),
    row: {},
    loadingRef: ref(false)
  })

  const getTableData = (params: any) => {
    if (variables.loadingRef) return
    variables.loadingRef = true
    const { state } = useAsyncState(
      queryProjectListPaging(params).then((res: ProjectRes) => {
        variables.totalPage = res.totalPage
        variables.tableData = res.totalList.map((item, unused) => {
          item.createTime = format(
            parseTime(item.createTime),
            'yyyy-MM-dd HH:mm:ss'
          )
          item.updateTime = format(
            parseTime(item.updateTime),
            'yyyy-MM-dd HH:mm:ss'
          )
          return {
            ...item
          }
        }) as any
        variables.loadingRef = false
      }),
      {}
    )
    return state
  }

  return {
    variables,
    getTableData,
    createColumns
  }
}
