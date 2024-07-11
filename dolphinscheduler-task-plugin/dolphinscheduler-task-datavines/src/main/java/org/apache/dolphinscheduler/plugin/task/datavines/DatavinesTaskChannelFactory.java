package org.apache.dolphinscheduler.plugin.task.datavines;


import com.google.auto.service.AutoService;
import org.apache.dolphinscheduler.plugin.task.api.TaskChannel;
import org.apache.dolphinscheduler.plugin.task.api.TaskChannelFactory;
import org.apache.dolphinscheduler.spi.params.base.PluginParams;

import java.util.Collections;
import java.util.List;

@AutoService(TaskChannelFactory.class)
public class DatavinesTaskChannelFactory implements TaskChannelFactory {
    @Override
    public TaskChannel create() {
        return new DatavinesTaskChannel();
    }

    @Override
    public String getName() {
        return "DATAVINES";
    }

    @Override
    public List<PluginParams> getParams() {
        return Collections.emptyList();
    }
}
