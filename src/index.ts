import * as core from '@actions/core';
import { SSMClient, SendCommandCommand } from "@aws-sdk/client-ssm";

type Parameters = {
    commands: string[]
    workingDirectory?: string[]
}

function get_document_name(os: string) {
    let documentName: string;
    if (os === 'linux') {
        documentName = "AWS-RunShellScript";
    }
    else if (os === 'windows') {
        documentName = "AWS-RunPowerShellScript";
    }
    else {
        throw Error(`${os} is not supported. Only linux or windows OS is supported.`)
    }
    return documentName;
}

function get_parameters(commands: string[], working_directory: string) {
    let parameters: Parameters = { commands: commands };

    if (working_directory) {
        parameters['workingDirectory'] = [working_directory];
    }

    return parameters;
}

async function run_ssm_send_command() {
    // Extract Inputs
    const AWS_REGION = core.getInput('aws-region');
    const INSTANCE_IDS = core.getMultilineInput('instance-ids');
    const COMMANDS = core.getMultilineInput('commands');
    const OS = core.getInput('os');
    const WORKING_DIRECTORY = core.getInput('working-directory');
    const COMMENT = core.getInput('comment');

    // Create client
    const client = new SSMClient({
        region: AWS_REGION,
    });

    // Prepare arguments
    const DOCUMENT_NAME = get_document_name(OS);
    const PARAMETERS = get_parameters(COMMANDS, WORKING_DIRECTORY);

    console.log(`Document: ${DOCUMENT_NAME}`)
    console.log(`Parameters: ${JSON.stringify(PARAMETERS)}`)

    // Prepare command
    const command = new SendCommandCommand({
        InstanceIds: INSTANCE_IDS,
        DocumentName: DOCUMENT_NAME,
        Comment: COMMENT,
        Parameters: PARAMETERS,
    })

    // Execute send command
    try {
        const response = await client.send(command);
        core.setOutput("command-id", response.Command?.CommandId);
    } catch (error) {
        console.log(error);
        core.error(String(error));
    }
}

run_ssm_send_command();