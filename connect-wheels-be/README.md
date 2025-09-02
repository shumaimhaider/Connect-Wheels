# Project is in progress
# Connect-Wheels

Download kafka
http://kafka.apache.org/downloads

# Step 1: Extract the Kafka archive from Downloads
tar -xvzf ~/Downloads/kafka_2.12-3.9.1.tgz -C ~/

# Step 2: Move and rename the extracted folder to ~/kafka
mv ~/kafka_2.12-3.9.1 ~/kafka

# create topics with make commands
make create-topic topic-name
