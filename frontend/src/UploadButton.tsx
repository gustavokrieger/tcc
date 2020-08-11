import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& > *": {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: "none",
        },
    }),
);

type UploadButtonProps = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export function UploadButton(props: UploadButtonProps) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <input
                className={classes.input}
                id="contained-button-file"
                accept="image/*"
                multiple
                type="file"
                onChange={props.onChange}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                    Upload
                </Button>
            </label>
        </div>
    );
}
