import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { Typography, Grid } from "@mui/material";

const TagInput = ({ onTagsChange, options = [] }) => {
    // タグの状態管理
    const [tags, setTags] = useState([]);
    // 入力フィールドの値
    const [inputValue, setInputValue] = useState("");
    // カウント（量）の初期値
    const [count, setCount] = useState(0);

    // 入力フィールドの値が変更されたときの処理
    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
    };

    // タグの追加
    const handleTagAction = (tag, calories) => {
        if (tag && !tags.some((t) => t.tag === tag)) {
            const updatedTags = [...tags, { tag, calories, count }];
            setTags(updatedTags);
            onTagsChange(updatedTags);
        }
    };

    // タグの削除
    const handleDeleteTag = (tag) => {
        const updatedTags = tags.filter((t) => t.tag !== tag);
        setTags(updatedTags);
        onTagsChange(updatedTags);
    };

    return (
        <div>
            {/* オートコンプリートを使用した入力フィールド */}
            <Autocomplete
                value={inputValue}
                onChange={(_, newValue) => {
                    const selectedOption = options.find(
                        (option) => Object.keys(option)[0] === newValue
                    );
                    if (selectedOption) {
                        handleTagAction(
                            newValue,
                            selectedOption[Object.keys(selectedOption)[0]]
                        );
                    }
                }}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                options={options.map((option) => Object.keys(option)[0])}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} label="食べ物" variant="outlined" />
                )}
            />
            {/* タグとスライダーの一覧 */}
            <Stack direction="column" spacing={1} marginTop={2}>
                {tags.map((tagObj, index) => (
                    <Grid item xs={12} key={index}>
                        <Typography variant="body1" sx={{ marginRight: 1 }}>
                            {/* タグの表示と削除チップ */}
                            {tagObj.tag} | {tagObj.count}×{tagObj.calories} kcal
                            <Chip
                                label="Delete"
                                onDelete={() => handleDeleteTag(tagObj.tag)}
                            />
                        </Typography>
                        {/* 数量を設定するスライダー */}
                        <Slider
                            value={tagObj.count}
                            onChange={(_, newValue) => {
                                const updatedTags = [...tags];
                                updatedTags[index].count = newValue;
                                setTags(updatedTags);
                                onTagsChange(updatedTags);
                            }}
                            valueLabelDisplay="auto"
                            step={1}
                            min={1}
                            max={10}
                        />
                    </Grid>
                ))}
            </Stack>
        </div>
    );
};

export default TagInput;
