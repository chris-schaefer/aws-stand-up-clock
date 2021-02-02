# Simple stand-up clock

The stand-up clock is a simple static website which allows agile teams to time-box their stand-up updates during daily scrum. See [here](http://showcase-stand-up-clock.s3-website.eu-central-1.amazonaws.com
) for a demo.

## How to use the clock

The clock jumps to the next team member when you click your mouse or hit any key. You can reset the running clock by hitting space. Team members are called in random order. The standup clock produces a noise when the time is up.

## How to customize the clock

Edit `team.js` and update the names of your team. You can further customize the clock by modifying the `standup.css`, `clock.js` and `index.html` file. Replace the GitHub logo with your company or project logo.

# Host as a static website

You can host the standup clock as a static website to make it accessible to all team members.

## Deploy on AWS S3

If you want to host on AWS you can use the following commands to deploy the necessary infrastructure via cloudformation. You need to have the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) installed.

Choose a name for your S3 bucket by setting `MY_BUCKET_NAME`. Note that the name needs to be [globally unique](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html). Restrict access to the stand-up clock by setting `MY_SOURCE_IP` to your corporate IP address. 
```
MY_BUCKET_NAME=showcase-stand-up-clock && MY_SOURCE_IP=0.0.0.0/0
```
Create a new cloudformation stack named `standup-clock` 
```
aws cloudformation create-stack \
    --stack-name stand-up-clock \
    --template-body file://template.yml \
    --parameters \
    ParameterKey=BucketName,ParameterValue=$MY_BUCKET_NAME \
    ParameterKey=SourceIP,ParameterValue=$MY_SOURCE_IP
```
Check the cloudformation stack status
```
aws cloudformation describe-stacks \
    --stack-name stand-up-clock \
    --query 'Stacks[0].StackStatus' \
    --output text
```
Wait until the status is `CREATE_COMPLETE`. Copy the website to the S3 bucket
```
aws s3 cp --recursive clock/ s3://$MY_BUCKET_NAME
```
Open the URL to access the website
```
aws cloudformation describe-stacks \
    --stack-name stand-up-clock \
    --query 'Stacks[0].Outputs[0].OutputValue' \
    --output text
```

## Remove from AWS S3

Remove the AWS cloudformation stack by running
```
aws s3 rm --recursive s3://$MY_BUCKET_NAME/
aws cloudformation delete-stack --stack-name stand-up-clock
```