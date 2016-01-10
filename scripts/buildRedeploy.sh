#!/bin/sh

echo "************ UNDEPLOYING *******************"
./../../../../../opt/devel/glassfish3/bin/asadmin undeploy musicstore
echo "************ BUILDING **********************"
mvn package
echo "************ DEPLOYING *********************"
./../../../../../opt/devel/glassfish3/bin/asadmin deploy target/musicstore.war
