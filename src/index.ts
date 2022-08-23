import * as core from '@actions/core';

function print_inputs() {
    const sample_input_1 = core.getInput('sample_input_1');
    console.log(sample_input_1);

    const optional_sample_input_2 = core.getInput('optional_sample_input_2');
    console.log(optional_sample_input_2);
}

print_inputs();