import { MultiSelectOptionGroups } from "../components/multi-select/multi-select-option-groups"

export const priviledges = new MultiSelectOptionGroups([
    {
        label: "Classifier",
        options: [
            {label: "Delete classifier instances", value: "classifier_delete"},
            {label: "Create and edit classifiers", value: "classifier_create_edit"},
            {label: "Start classification jobs", value: "classifier_start_jobs"},
            {label: "Access the classifier", value: "classifier_access"},
        ]
    },
    {
        label: "Project",
        options: [
            {label: "Create and edit project data", value: "project_create_edit"},
            {label: "Delete project data", value: "project_delete"},
            {label: "Access projects", value: "project_access"},
        ]
    },
    {
        label: "Corpus",
        options: [
            {label: "Delete corpora", value: "corpus_delete"},
            {label: "Create and edit corpora", value: "corpus_create_edit"},
            {label: "Access the corpus management", value: "corpus_access"},
        ]
    },
    {
        label: "Workflow",
        options: [
            {label: "Assign items in the Workflow Management", value: "workflow_assign"},
            {label: "Approve Workflow items", value: "workflow_approve"},
            {label: "Reject Workflow items", value: "workflow_reject"},
            {label: "Edit the Workflow settings", value: "workflow_edit"},
        ]
    },
])