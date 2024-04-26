namespace BhaktiLounge.Server.Data.Conveters {

    using System;
    using System.Text.Json;
    using System.Text.Json.Serialization;

    public class DayOfWeekConverter : JsonConverter<DayOfWeek> {

        public override DayOfWeek Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
            string dayName = reader.GetString();
            return (DayOfWeek)Enum.Parse(typeof(DayOfWeek), dayName, ignoreCase: true);
        }

        public override void Write(Utf8JsonWriter writer, DayOfWeek value, JsonSerializerOptions options) {
            writer.WriteStringValue(value.ToString());
        }
    }
}