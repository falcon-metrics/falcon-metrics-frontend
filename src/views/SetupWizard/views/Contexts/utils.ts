import * as yup from "yup";

export const validationSchema = (isAzure) => {
  const schema = yup.object().shape({
    contexts: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Board name is required."),
        cost: yup
          .mixed()
          .nullable()
          .test(
            "sum-of-children-cost",
            "The total cost of 2nd-tier boards should not be greater than the cost of 1st-tier board.",
            function (value) {
              const children = this.parent.children || [];
              const totalChildCost = children
                .map((child) => parseFloat(child.cost) || 0)
                .reduce((acc, curr) => acc + curr, 0);

              return (parseFloat(value) || 0) >= totalChildCost;
            }
          ),
        children: yup.array().of(
          yup.object().shape({
            name: yup.string().required("Board name is required."),
            cost: yup
              .mixed()
              .nullable()
              .test(
                "sum-of-grandchildren-cost",
                "The total cost of 3rd-tier boards should not be greater than the cost of 2nd-tier board.",
                function (value) {
                  const grandchildren = this.parent.children || [];
                  const totalGrandchildCost = grandchildren
                    .map((grandchild) => parseFloat(grandchild.cost) || 0)
                    .reduce((acc, curr) => acc + curr, 0);

                  return (parseFloat(value) || 0) >= totalGrandchildCost;
                }
              ),
            children: yup.lazy((children) => {
              // If there are grandchildren, validate them; otherwise, no validation needed
              return children && children.length > 0
                ? yup.array().of(
                    yup.object({
                      name: yup.string().required("Board name is required."),
                      address: isAzure
                        ? yup.array().required("Aggregation name is required.")
                        : yup
                            .string()
                            .required("Aggregation name is required."),
                      cost: yup.mixed().nullable(),
                    })
                  )
                : yup.array();
            }),
          })
        ),
      })
    ),
  });

  return schema;
};
