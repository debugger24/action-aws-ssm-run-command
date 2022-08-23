# GitHub Action - AWS SSM Run Command

Github Action for running commands on Linux or Windows machine managed using SSM

## Usage

```yaml
- name: Execute command
  uses: debugger24/action-aws-ssm-run-command@v1
  with:
      aws-region: us-east-1
      instance-ids: |
        instance_id_1
        instance_id_2
      commands: |
        pwd
        ls
        echo "Executed by Github Actions Workflow #${{ github.run_id }}" >> test.txt
```
