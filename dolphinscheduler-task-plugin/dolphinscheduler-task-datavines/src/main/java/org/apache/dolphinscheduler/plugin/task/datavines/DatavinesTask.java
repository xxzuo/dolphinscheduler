package org.apache.dolphinscheduler.plugin.task.datavines;


import org.apache.dolphinscheduler.plugin.task.api.AbstractRemoteTask;
import org.apache.dolphinscheduler.plugin.task.api.TaskException;
import org.apache.dolphinscheduler.plugin.task.api.TaskExecutionContext;
import org.apache.dolphinscheduler.plugin.task.api.parameters.AbstractParameters;

import java.util.Collections;
import java.util.List;

public class DatavinesTask extends AbstractRemoteTask {
    /**
     * constructor
     *
     * @param taskExecutionContext taskExecutionContext
     */
    protected DatavinesTask(TaskExecutionContext taskExecutionContext) {
        super(taskExecutionContext);
    }

    @Override
    public List<String> getApplicationIds() throws TaskException {
        return Collections.emptyList();
    }

    @Override
    public void init(){
        super.init();
    }

    @Override
    public void cancelApplication() throws TaskException {

    }

    @Override
    public void submitApplication() throws TaskException {

    }

    @Override
    public void trackApplicationStatus() throws TaskException {

    }

    @Override
    public AbstractParameters getParameters() {
        return null;
    }
}
