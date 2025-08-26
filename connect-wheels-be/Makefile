KAFKA_DIR=~/kafka
BOOTSTRAP_SERVER=localhost:9092

.PHONY: create-topic delete-topic list-topics

%:
	@:

start-zookeeper:
	cd $(KAFKA_DIR) && bin/zookeeper-server-start.sh config/zookeeper.properties

start-kafka:
	cd $(KAFKA_DIR) && bin/kafka-server-start.sh config/server.properties



create-topic:
	cd $(KAFKA_DIR) && \
	bin/kafka-topics.sh --create --topic $(word 2, $(MAKECMDGOALS)) --bootstrap-server $(BOOTSTRAP_SERVER) --partitions 1 --replication-factor 1 || true

delete-topic:
	cd $(KAFKA_DIR) && \
	bin/kafka-topics.sh --delete --topic $(word 2, $(MAKECMDGOALS)) --bootstrap-server $(BOOTSTRAP_SERVER) || true

list-topics:
	cd $(KAFKA_DIR) && bin/kafka-topics.sh --list --bootstrap-server $(BOOTSTRAP_SERVER)


