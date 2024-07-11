package org.apache.dolphinscheduler.plugin.task.datavines;


import org.apache.dolphinscheduler.plugin.task.api.AbstractTask;
import org.apache.dolphinscheduler.plugin.task.api.TaskChannel;
import org.apache.dolphinscheduler.plugin.task.api.TaskExecutionContext;
import org.apache.dolphinscheduler.plugin.task.api.parameters.AbstractParameters;
import org.apache.dolphinscheduler.plugin.task.api.parameters.ParametersNode;
import org.apache.dolphinscheduler.plugin.task.api.parameters.resource.ResourceParametersHelper;

public class DatavinesTaskChannel implements TaskChannel {

    @Override
    public void cancelApplication(boolean status) {

    }

    @Override
    public AbstractTask createTask(TaskExecutionContext taskRequest) {
        return null;
    }

    @Override
    public AbstractParameters parseParameters(ParametersNode parametersNode) {
        return null;
    }

    @Override
    public ResourceParametersHelper getResources(String parameters) {
        return null;
    }
}
