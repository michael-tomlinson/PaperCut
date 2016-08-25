

function printJobHook(inputs, actions) {
	
	var maxPages = 25;
	//if total # of pages is greater than allowed
	if (inputs.job.totalPages >= maxPages) {
		actions.job.chargeToPersonalAccount();
	}

	/**
	* The checks made above need to be made BEFORE the job analysis
	* is complete or it may be too late to supress the account pop-up
	*/

	if (!inputs.job.isAnalysisComplete) {
		//Full job details are not yet available. Return and wait to be called again
		return;
	}
}