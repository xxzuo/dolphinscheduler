package org.apache.dolphinscheduler.plugin.task.datavines;


import org.apache.commons.lang3.StringUtils;
import org.apache.dolphinscheduler.plugin.task.api.parameters.AbstractParameters;

public class DatavinesParameters extends AbstractParameters {

    private String address;
    private String jobId;
    private String token;

    @Override
    public boolean checkParameters() {
        return StringUtils.isNotEmpty(this.address) && StringUtils.isNotEmpty(this.jobId);
    }


    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
