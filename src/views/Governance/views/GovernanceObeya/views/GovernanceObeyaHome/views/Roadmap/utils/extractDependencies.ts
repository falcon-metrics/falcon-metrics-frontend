export const extractDependencies = (tasks) => {
        const dependencies: any = [];
        tasks.forEach((item) => {

            // case where dependencies created by roadmap control
            if (item.dependencies && item.dependencies.length > 0) {
                item.dependencies.forEach((dependency) => {
                    dependencies.push({
                        fromEvent: dependency.fromEvent,
                        toEvent: dependency.toEvent,
                        type: dependency.type,
                    });
                });
            }

            // case where dependencies are created through jira (state.linkedItems)
            if (item.linkedItems && item.linkedItems.length > 0) {
                item.linkedItems.forEach((links) => {
                    /* 
                      - "is dependent on" (FROM), "is a dependency for" (TO)
                      - "blocks" (FROM), "is blocked by" (TO)
                    */
                    if (links.type === "is blocked by" || links.type === "is a dependency for") {
                        dependencies.push({
                            fromEvent: item.id,
                            toEvent: links.workItemId,
                            type: 2, //"end to start" type
                            cls: links.type === "is blocked by" ? "b-sch-dependency-is-blocked-by" : "b-sch-dependency-is-dependency-for"
                        });
                    }

                    if (links.type === "is dependent on" || links.type === "blocks") {
                        dependencies.push({
                            fromEvent: links.workItemId,
                            toEvent: item.id,
                            type: 1, //"start to end"
                            cls: links.type === "is dependent on" ? "b-sch-dependency-is-dependent-on" : "b-sch-dependency-blocks"
                        });
                    }
                });
            }


            if (item.children && item.children.length > 0) {
                const childDependencies = extractDependencies(item.children);
                dependencies.push(...childDependencies);
            }
        });

        return dependencies;
    };