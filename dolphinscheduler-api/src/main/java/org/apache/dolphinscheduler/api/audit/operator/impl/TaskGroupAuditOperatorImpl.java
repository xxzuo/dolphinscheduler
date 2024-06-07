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

package org.apache.dolphinscheduler.api.audit.operator.impl;

import org.apache.dolphinscheduler.api.audit.operator.BaseAuditOperator;
import org.apache.dolphinscheduler.dao.entity.TaskGroup;
import org.apache.dolphinscheduler.dao.mapper.TaskGroupMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskGroupAuditOperatorImpl extends BaseAuditOperator {

    @Autowired
    private TaskGroupMapper taskGroupMapper;

    @Override
    public String getObjectNameFromIdentity(Object identity) {
        Long objId = toLong(identity);
        if (objId == -1) {
            return "";
        }

        TaskGroup obj = taskGroupMapper.selectById(objId);
        return obj == null ? "" : obj.getName();
    }
}
