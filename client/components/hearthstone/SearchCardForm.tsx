import React, { useEffect } from "react";
import { ActionIcon, Col, Grid, Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

export const SearchCardForm = ({ metadata, searchCallback, form }: any) => {
  const items: any = Array.from({ length: 11 }, (_, index) => ({
    label: `${index} Mana`,
    value: index,
  }));
  const cardType = metadata?.cardType?.map((item: any) => ({
    label: item.name,
    value: item.slug,
  }));
  const keyword = metadata?.keyword?.map((item: any) => ({
    label: item.name,
    value: item.slug,
  }));
  const minionType = metadata?.minionType?.map((item: any) => ({
    label: item.name,
    value: item.slug,
  }));
  const rarity = metadata?.rarity?.map((item: any) => ({
    label: item.name,
    value: item.slug,
  }));
  useEffect(() => {});
  return (
    <>
      <form
        onSubmit={form.onSubmit(() => {
          searchCallback(form.values, true);
        })}
      >
        <Grid>
          <Col span={6} sm={3} md={3} lg={3}>
            <TextInput
              {...form.getInputProps("name")}
              placeholder="Your name"
              label="Full name"
            />
          </Col>
          <Col offsetSm={1} span={6} sm={3} md={2} lg={2}>
            <Select
              {...form.getInputProps("cost")}
              label="Cost"
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              maxDropdownHeight={280}
              data={items || []}
              allowDeselect
            />
          </Col>
          <Col span={6} sm={3} md={2} lg={2}>
            <Select
              {...form.getInputProps("cardType")}
              label="Type"
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              maxDropdownHeight={280}
              data={cardType || []}
              allowDeselect
            />
          </Col>
          <Col span={6} sm={3} md={2} lg={2}>
            <Select
              label="Minion type"
              {...form.getInputProps("minionType")}
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              maxDropdownHeight={280}
              data={minionType || []}
              allowDeselect
            />
          </Col>
          <Col span={6} sm={3} md={2} lg={2} offsetSm={1}>
            <Select
              {...form.getInputProps("keyword")}
              label="Keyword"
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              maxDropdownHeight={280}
              data={keyword || []}
              allowDeselect
            />
          </Col>
          <Col span={6} sm={3} md={2} lg={2}>
            <Select
              {...form.getInputProps("rarity")}
              label="Rarity"
              placeholder="Pick one"
              searchable
              nothingFound="No options"
              maxDropdownHeight={280}
              data={rarity || []}
              allowDeselect
            />
          </Col>
          <Col offsetSm={0} span={1} style={{ position: "relative" }}>
            <div style={{ bottom: 8, position: "absolute" }}>
              <ActionIcon type={"submit"} size={36} variant="filled">
                <IconSearch size={"18"} />
              </ActionIcon>
            </div>
          </Col>
        </Grid>
      </form>
    </>
  );
};
