namespace BhaktiLounge.Server.Data.Conveters {

    using System;
    using System.Text.Json;
    using System.Text.Json.Serialization;

    public class DateOnlyConverter : JsonConverter<DateOnly> {

        public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
            if (reader.TokenType != JsonTokenType.StartObject) {
                throw new JsonException("Expected StartObject token.");
            }

            int year = 0, month = 0, day = 0;
            while (reader.Read()) {
                if (reader.TokenType == JsonTokenType.EndObject) {
                    return new DateOnly(year, month, day);
                }

                if (reader.TokenType == JsonTokenType.PropertyName) {
                    var propertyName = reader.GetString();
                    reader.Read();
                    switch (propertyName) {
                        case "year":
                            year = reader.GetInt32();
                            break;

                        case "month":
                            month = reader.GetInt32();
                            break;

                        case "day":
                            day = reader.GetInt32();
                            break;
                        case "dayOfWeek":
                            break;
                        
                        default:
                            throw new JsonException($"Unknown property: {propertyName}");
                    }
                }
            }

            throw new JsonException("Unexpected end when reading JSON.");
        }

        public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options) {
            writer.WriteStartObject();
            writer.WriteNumber("year", value.Year);
            writer.WriteNumber("month", value.Month);
            writer.WriteNumber("day", value.Day);
            writer.WriteString("dayOfWeek", value.DayOfWeek.ToString());
            writer.WriteEndObject();
        }
    }
}